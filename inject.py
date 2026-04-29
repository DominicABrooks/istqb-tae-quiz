import json
import re

with open('quiz_by_chapter.json', 'r', encoding='utf-8') as f:
    new_qs = json.load(f)

with open('quiz-app/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# Remove Chapter 9 if it exists
ch9_start = data_content.find('{\n    "id": "ch9"')
if ch9_start != -1:
    preceding = data_content.rfind('},', 0, ch9_start)
    if preceding != -1:
        data_content = data_content[:preceding+1] + '\n];'

for ch_str, qs in new_qs.items():
    if not qs:
        continue
    
    ch_id = f'"id": "ch{ch_str}"'
    idx = data_content.find(ch_id)
    if idx == -1:
        ch_id = f'id: "ch{ch_str}"'
        idx = data_content.find(ch_id)
        
    if idx != -1:
        quiz_idx = data_content.find('quiz: [', idx)
        if quiz_idx != -1:
            insert_pos = quiz_idx + len('quiz: [')
            
            qs_str = ""
            for q in qs:
                # We need to make sure the JSON format blends into the JS code
                q_json = json.dumps(q, indent=8)
                qs_str += f"\n{q_json},"
                
            data_content = data_content[:insert_pos] + qs_str + data_content[insert_pos:]

with open('quiz-app/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)
print("Injection complete.")
