import re
import json

# 1. Read existing questions
with open("src/data/questions.js", "r", encoding="utf-8") as f:
    js_text = f.read()

# Extract JSON part
json_str = js_text.replace("export const questions = ", "").replace(";", "").strip()
existing_questions = json.loads(json_str)

# 2. Parse new questions
with open("scratch.txt", "r", encoding="utf-8") as f:
    text = f.read()

lines = [l.strip() for l in text.split('\n') if 'Answer:' in l]
start_id = len(existing_questions) + 1

new_questions = []
for idx, line in enumerate(lines):
    match = re.search(r"(.*?)\s*a\)\s*(.*?)\s*b\)\s*(.*?)\s*c\)\s*(.*?)\s*d\)\s*(.*?)\s*Answer:\s*([a-d])", line, re.IGNORECASE)
    
    if match:
        q = match.group(1).strip()
        optA = match.group(2).strip()
        optB = match.group(3).strip()
        optC = match.group(4).strip()
        optD = match.group(5).strip()
        ans_letter = match.group(6).lower()
        
        options = [optA, optB, optC, optD]
        answer = ""
        if ans_letter == 'a': answer = optA
        elif ans_letter == 'b': answer = optB
        elif ans_letter == 'c': answer = optC
        elif ans_letter == 'd': answer = optD
        
        new_questions.append({
            "id": start_id + idx,
            "question": q,
            "options": options,
            "answer": answer,
            "category": "Environmental Pollution",
            "difficulty": "Mixed"
        })
    else:
        print("Failed to match:", line)

# 3. Merge and save
all_questions = existing_questions + new_questions

js_content = "export const questions = " + json.dumps(all_questions, indent=2) + ";"
with open("src/data/questions.js", "w", encoding="utf-8") as f:
    f.write(js_content)
print(f"Appended {len(new_questions)} questions successfully. Total questions: {len(all_questions)}")
