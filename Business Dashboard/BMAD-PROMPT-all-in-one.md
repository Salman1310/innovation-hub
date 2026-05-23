# BMAD All-in-One Prompt — Skill Intelligence Matching

> Single prompt for BMAD (Claude Sonnet 4.6 high) to read Excel data, perform skill matching, and output results directly into the dashboard HTML.

---

## Prompt

```
You have access to the following Excel files in the working directory. Read them, analyze the data, and perform intelligent skill-to-role matching.

## TASK

1. Read the SUPPLY data (available people with skills)
2. Read the DEMAND data (open roles needing skills)  
3. Match people to roles based on skill similarity
4. Output a complete "Skill Intelligence" HTML table section with the results

## SUPPLY DATA — Available People

Read file: "India CD & US Tech.xlsx" → Sheet "Data"

Extract all rows where:
- Column "Status" = "Active"  
- OR Column "Category" (col 25) = "In Pipeline Capacity Creation" or "Moved to a new role"

For each qualifying person, extract:
- Employee Name
- Primary Skills
- Secondary Skills  
- Skills for the new role (if already assigned)
- Team Name
- Reinvested in AI Role (Y/N)

This gives you the TALENT POOL — people available for redeployment.

## DEMAND DATA — Open Roles

Read these files for open positions:

### File 1: "India TA Open Positions Data - May 8.xlsx" → Sheet "Sheet1"
- Filter: Status = "Open"
- Extract: Skillset, Skill Type (Niche/Vanilla), Designation, Department, Location

### File 2: "SLGS PH Open Demand_260511.xlsx" → Sheet "Open DRFs (For HR)"  
- Data starts at row 12 (header row)
- Extract: Role of Requested Demand, Required Skill (Primary), Required Skill (Secondary), Market Assignment

### File 3: "India Contractor Positions - 13 May.xlsx" → Sheet "Open & Offered Roles"
- Header at row 2
- Extract: Role, Primary Skill, Secondary Skill, Status

## MATCHING LOGIC

For each open role, find the best-matching people from the talent pool:

**Scoring rules:**
- If person's primary skill keywords directly appear in role's required skills → Score 85-95%
- If person's secondary skills or "skills for new role" match → Score 70-84%
- If skills are adjacent/transferable (e.g., "AWS Glue" person for "ETL Engineer" role, or "Java Spring Boot" for "Full Stack Developer") → Score 50-69%
- Same function/team as the role → +5% bonus

**Adjacency map (use your judgment for similar cases):**
- AWS / Python / Lambda → GenAI infrastructure roles
- Java / Spring Boot → Full Stack, Backend, Microservices roles
- Hybrid Testing → QE, Automation, Web Testing roles
- Project Management / Scrum → Delivery Management, Agile PM roles
- RPA / UiPath → Automation, Process Engineering roles
- Data Science / Analytics → Data Engineering, ML roles
- Mainframe / COBOL → Legacy Modernization roles

## OUTPUT FORMAT

Generate an HTML table section with this exact structure:

```html
<!-- Skill Intelligence Section -->
<div class="section-row">
  <span class="section-label">Skill Intelligence — Role Matching</span>
</div>

<!-- Summary metrics -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-card__label">People in Pool</div>
    <div class="metric-card__value metric-card__value--green">[COUNT]</div>
  </div>
  <div class="metric-card">
    <div class="metric-card__label">Open Roles Analyzed</div>
    <div class="metric-card__value">[COUNT]</div>
  </div>
  <div class="metric-card">
    <div class="metric-card__label">Roles Matched (Internal)</div>
    <div class="metric-card__value metric-card__value--green">[COUNT]</div>
  </div>
  <div class="metric-card">
    <div class="metric-card__label">Needs External Hiring</div>
    <div class="metric-card__value" style="color:#D63031">[COUNT]</div>
  </div>
</div>

<!-- Matches table -->
<div class="table-section">
  <div class="table-header">
    <div>
      <div class="table-title">Top Skill Matches (Internal Pool)</div>
      <div class="table-subtitle">AI-analyzed skill matching</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Open Role</th>
        <th>Candidate</th>
        <th>Score</th>
        <th>Matching Basis</th>
      </tr>
    </thead>
    <tbody>
      <!-- For each match: -->
      <tr>
        <td>[Role Title]</td>
        <td>[Person Name]</td>
        <td><span class="status-pill status-pill--growing">[Score]%</span></td>
        <td>[Why this person matches — 1 line]</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Color coding for score pills:**
- 80%+ → `status-pill--growing` (green)
- 60-79% → `status-pill--stable` (gold)  
- Below 60% → `status-pill--declining` (red)

## RULES

1. Show maximum 5 candidates per role
2. Only show top 15-20 matches total (highest confidence first)
3. Group by role where possible (multiple candidates for same role)
4. Include the matching basis — WHY this person fits (1 sentence max)
5. Do NOT expose ACF2 IDs — only show Employee Name
6. If a person has "Skills for the new role" already filled, they're ALREADY matched — note this
7. People in "In Pipeline Capacity Creation" category are highest priority for matching
8. Roles from "India Contractor" source are higher priority (immediate need)

## EXAMPLE OUTPUT ROW

If you find that Sumeet Khanna (Primary: "AWS Glue") matches a Data Engineer role requiring "ETL, PySpark, AWS":

```html
<tr>
  <td>Data Engineer (PH DRF)</td>
  <td>Sumeet Khanna</td>
  <td><span class="status-pill status-pill--growing">88%</span></td>
  <td>Direct: AWS Glue + PySpark. ETL data engineering experience.</td>
</tr>
```

Now read the Excel files and generate the complete Skill Intelligence HTML section.
```

---

## Notes for the team

- **No Python needed.** BMAD reads the Excels directly (via its file access / code interpreter), does the analysis in-context, and outputs the HTML.
- **Deterministic enough:** Same input data → same top matches. Minor variation in borderline scores is acceptable.
- **Refresh:** Re-run this prompt whenever Excel data updates. Copy the output HTML into the dashboard.
- **Fallback:** If BMAD can't read `.xlsx` directly, pre-convert to CSV first: `xlsx2csv "India CD & US Tech.xlsx" > supply.csv` then reference CSVs in the prompt instead.
