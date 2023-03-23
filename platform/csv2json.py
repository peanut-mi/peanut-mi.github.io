import json

f=open("csv/junk mail.pcap_Flow.csv","r",encoding='gbk') #
ls=[]
for line in f:
    line = line.replace("\n", "")
    ls.append(line.split(","))

f.close()
# fw=open("json/normal1.json","w",encoding='utf-8')
# for i in range(1,min(21,len(ls))): # 最多展示20行 7列
#     ls[i]=dict(zip(ls[0][0:8],ls[i][0:8]))
print(ls[0][:8])
for i in range(1,min(26,len(ls))): # 最多展示20行 7列
    # ls[i]=dict(zip(ls[0][0:8],ls[i][0:8]))
    s = "<tr><td>"
    for j in range(8):
        s += (str(ls[i][j])+"</td>")
        if j<7: s += "<td>"
    s += "</tr>"
    print(s)
# a = json.dumps(ls[1:][0:8],sort_keys=True,indent=4,ensure_ascii=False)
# print(a)

# fw.write(a)
# fw.close()




    

