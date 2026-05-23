# BMAD Prompt — Skill Intelligence Matching Module

> Use this prompt with Claude Sonnet 4.6 (high) inside BMAD to generate the skill matching logic and dashboard section.

---

## System Context

You are building a **SLGS Capacity Creation Leadership Dashboard** (standalone HTML file generated from Excel data). You need to add a **Skill Intelligence** section that matches available internal employees to open roles based on skill similarity.

---

## Prompt

```
You are an enterprise HR analytics engineer building a Capacity Dashboard for Sun Life (SLGS). 

Your task: Build a "Skill Intelligence" module that:
1. Reads available people from the capacity creation Excel data
2. Reads open roles/demands from hiring Excel data  
3. Matches people to roles using hybrid skill matching (keyword + semantic)
4. Outputs results into the dashboard HTML

## DATA SOURCES

### Supply Side (Available People)
File: "India CD & US Tech.xlsx" → Sheet "Data"
Key columns:
- Employee Name (col 15)
- Primary Skills (col 20) 
- Secondary Skills (col 21)
- Status (col 27) — filter for "Active" only
- Category (col 25) — include "In Pipeline Capacity Creation", "Moved to a new role"
- Skills for the new role (col 37) — what they've been matched to already
- Team Name (col 17)
- Reinvested in AI Role (Y/N) (col 38)

File: "India Ops.xlsx" → Sheet "Sheet1" — same structure if employee columns exist

### Demand Side (Open Roles)
File: "India TA Open Positions Data - May 8.xlsx" → Sheet "Sheet1"
Key columns:
- Skillset (col 5) — the skill required
- Skill Type (col 4) — "Niche" or "Vanilla"
- Status (col 18) — filter for "Open" only
- Designation (col 13) — role title
- Department (col 11)
- Location (col 6)

File: "SLGS PH Open Demand_260511.xlsx" → Sheet "Open DRFs (For HR)"
Key columns (header starts at row 12):
- Role of Requested Demand (col 5)
- Required Skill Primary (col 8)
- Required Skill Secondary (col 9)
- Required Skill Tertiary (col 10)
- Market Assignment (col 3)

File: "India Contractor Positions - 13 May.xlsx" → Sheet "Open & Offered Roles"
Key columns (header at row 2):
- Role (col 4)
- Primary Skill (col 9)
- Secondary Skill (col 10)
- Status (col 28)

## MATCHING LOGIC

### Pass 1: Rule-based (always runs)
1. Tokenize all skill strings into lowercase keywords (split on , / ; | newlines)
2. Remove noise words (and, or, the, in, of, for, with)
3. Compute role_coverage = |overlap_tokens| / |role_tokens|
4. Keep matches where role_coverage >= 0.3
5. Classify: >0.7 = "High confidence", >0.5 = "Medium", else "Low"

### Pass 2: AI Semantic (runs for unmatched roles only)
Use Claude API to semantically match remaining unmatched roles against the people pool.
Prompt Claude with the role requirements + people skills and ask for top 1-3 matches with reasoning.
Score adjacent/transferable skills (e.g., "AWS Glue" → "ETL Engineer") at 0.5-0.7.

### Scoring Criteria
- Exact primary skill keyword match → 90% confidence
- Secondary skill match → 70%  
- Adjacent/transferable (AI-inferred) → 50%
- Same function/team background → +10% bonus

## OUTPUT FORMAT

Generate a JSON structure:
{
  "summary": {
    "total_people": N,
    "total_roles": N,
    "roles_matched": N,
    "roles_unmatched": N
  },
  "matches": [
    {
      "role_title": "GenAI Engineer",
      "required_skills": "AWS Lambda, Agentic AI",
      "source": "India Contractor",
      "candidates": [
        {
          "name": "Person Name",
          "score": 0.85,
          "confidence": "high",
          "basis": "Exact match: AWS, Python + adjacent: GenAI",
          "primary_skills": "AWS, Python",
          "match_type": "rule_based"
        }
      ]
    }
  ],
  "unmatched_roles": [...]
}

## HTML RENDERING

In the dashboard HTML, render a "Skill Intelligence" section:
- Section header: "Skill Intelligence — Role Matching"
- For each matched role: show role title, required skills, and matched candidates as a table
- Color code confidence: green (high), gold (medium), red (low)
- Show match basis/reasoning for each candidate
- Include a summary card showing: X roles matched, Y people in pool, Z unmatched

## STYLE GUIDELINES (Sun Life Theme)

Colors:
- Background: #FFF9EE with radial gradients
- Cards: white with rgba(236, 171, 35, 0.12) border
- Green (high confidence): #0E5665 / #4A8C5C
- Gold (medium): #ECAB23
- Red (low/unmatched): #D63031
- Text primary: #1F2A2E
- Text secondary: #5B6770
- Mono font for scores: 'JetBrains Mono'

Fonts:
- Headings: 'Space Grotesk', 700
- Body: 'Inter', 400-500
- Numbers/scores: 'JetBrains Mono', 500

Table style:
- Header bg: #F8F9FC
- Row hover: #FFF7E3
- Status pills: border-radius 999px, 3px 10px padding

## CONSTRAINTS

- Maximum 5 candidates per role
- Only show roles with at least 1 match in the main table
- Unmatched roles go in a separate "Needs External Hiring" section
- Do not expose ACF2 IDs or personal identifiers beyond name
- All data stays local — no external API calls in the HTML output
```

---

## Usage Notes

1. **Without API key:** Script runs rule-based only (Pass 1). Still catches 60-70% of obvious matches.
2. **With API key:** Set `ANTHROPIC_API_KEY` env var. Claude handles fuzzy cases like "Hybrid Testing" → "Web & Mobile Testing" roles.
3. **Output consumption:** The `skill_matches.json` file is read by `generate_dashboard.py` (or equivalent BMAD step) and injected into the HTML template.
4. **Refresh cycle:** Re-run whenever Excel data updates. JSON output is deterministic for same input (except AI pass which may vary slightly).

---

## Integration with existing generate_dashboard.py

Add after the existing capacity/pipeline sections:

```python
# Load skill matching results
import json
with open("skill_matches.json") as f:
    skill_data = json.load(f)

# Inject into HTML template
skill_html = render_skill_intelligence_section(skill_data)
# ... append to dashboard HTML
```
