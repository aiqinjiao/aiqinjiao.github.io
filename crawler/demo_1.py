# coding: UTF-8
# 家教114

import requests
from bs4 import BeautifulSoup
import csv

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'}

# 字符串编码转换
def set_code(str):
    t_str = str.encode('ISO-8859-1').decode('UTF-8')
    return t_str

# 获取深圳地区教员信息
# 深圳地区老师列表循环翻页
# http://sz.jiajiao114.com/teacher/l-a29-p1.html

t_list = [['姓名','所在高校','老师类型','可授科目']]


for i in range(1, 11):
    link = 'http://sz.jiajiao114.com/teacher/l-a29-p'+ str(i) +'.html'

    r = requests.get(link, headers, timeout=20)

    soup = BeautifulSoup(r.text, 'lxml')

    teacher_list = soup.find('div', class_='teacher-list').find_all('div', class_='left')

    for teacher in teacher_list:
        t_info = []
        t_name = teacher.find('div', class_='teacher-pic').span.text
        t_name = set_code(t_name)
        t_info.append(t_name)
        teacher_info = teacher.find('div', class_='teacher-info').find_all('dl')
        t_school = teacher_info[0].dd.text
        t_school = set_code(t_school)
        t_info.append(t_school)
        t_type = teacher_info[1].dd.text
        t_type = set_code(t_type)
        t_info.append(t_type)
        t_subject = teacher_info[2].dd.text
        t_subject = set_code(t_subject)
        t_info.append(t_subject)

        t_list.append(t_info)

with open('jiajiao.csv', 'w+', encoding='UTF-8') as csv_file:
    f = csv.writer(csv_file)
    for i in range(len(t_list)):
        f.writerow(t_list[i])











