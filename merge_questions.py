import re
import json

def parse():
    with open('temp_exam.txt', 'r', encoding='utf-8') as f:
        exam_text = f.read()
        
    with open('temp_answers.txt', 'r', encoding='utf-8') as f:
        answers_text = f.read()

    questions = {}
    
    exam_text = re.sub(r'Advanced Level Test Automation Engineering.*?© International Software Testing Qualifications Board', '', exam_text, flags=re.DOTALL)
    
    q_blocks = re.split(r'Question #(\d+) \(\d+ Point(?:s)?\)', exam_text)
    
    for i in range(1, len(q_blocks), 2):
        q_num = int(q_blocks[i])
        block = q_blocks[i+1]
        
        opt_matches = list(re.finditer(r'\n([a-e])\)\s+(.*?)(?=\n[a-e]\)|\nSelect [A-Z]+ option|\Z)', block, flags=re.DOTALL))
        
        options = []
        option_letters = []
        for m in opt_matches:
            option_letters.append(m.group(1))
            options.append(m.group(2).strip().replace('\n', ' '))
            
        if opt_matches:
            q_text = block[:opt_matches[0].start()].strip().replace('\n', ' ')
        else:
            q_text = block.strip()
            
        questions[q_num] = {
            "question": f"[Official Exam] {q_text}",
            "options": options,
            "option_letters": option_letters,
            "correctAnswer": 0,
            "explanation": ""
        }

    answers_text = re.sub(r'Advanced Level Test Automation Engineering.*?© International Software Testing Qualifications Board', '', answers_text, flags=re.DOTALL)

    ans_blocks = re.split(r'\n(\d+)\s*\n([a-e](?:,\s*[a-e])?)\s*\n(a\).*?(?=\n\d+\s*\n[a-e]|\nTAE-|\Z))', answers_text, flags=re.DOTALL)
    
    for i in range(1, len(ans_blocks)-3, 4):
        q_num_str = ans_blocks[i].strip()
        if not q_num_str.isdigit():
            continue
        q_num = int(q_num_str)
        correct_ans_str = ans_blocks[i+1].strip()
        explanation = ans_blocks[i+2].strip().replace('\n', ' ')
        
        if q_num in questions:
            if ',' not in correct_ans_str:
                letters = questions[q_num]["option_letters"]
                if correct_ans_str in letters:
                    questions[q_num]["correctAnswer"] = letters.index(correct_ans_str)
                questions[q_num]["explanation"] = f"[Official Explanation] {explanation}"
            else:
                questions[q_num]["skip"] = True

    lo_matches = re.finditer(r'\n(\d+)\s*\n[a-e](?:,\s*[a-e])?\s*\nTAE-(\d)\.\d\.\d', answers_text)
    
    for m in lo_matches:
        q_num = int(m.group(1))
        chapter = int(m.group(2))
        if q_num in questions:
            questions[q_num]["chapter"] = chapter

    valid_qs_by_chapter = {i: [] for i in range(0, 9)}
    for q_num in sorted(questions.keys()):
        q = questions[q_num]
        if q["options"] and q["explanation"] and not q.get("skip"):
            chap = q.get("chapter")
            if chap is not None and chap in valid_qs_by_chapter:
                valid_qs_by_chapter[chap].append({
                    "question": q["question"],
                    "options": q["options"],
                    "correctAnswer": q["correctAnswer"],
                    "explanation": q["explanation"]
                })

    with open('quiz_by_chapter.json', 'w', encoding='utf-8') as f:
        json.dump(valid_qs_by_chapter, f, indent=2)

parse()
