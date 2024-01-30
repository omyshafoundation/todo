import json
assignees_name = []
with open("input.json","r") as file1:
    file=file1.read()
    filejson=json.loads(file)
#print(filejson)
for task in filejson:
        if(task["Task_assignee"] in assignees_name):
              continue
        else:
                assignees_name.append(task["Task_assignee"])
#print(assignees_name)
for x in range(len(assignees_name)):
       print(assignees_name[x])
       print("tasks below: ")
       for task in filejson:
              if(task["Task_assignee"]==assignees_name[x]):
                     print(task["Task_name"])