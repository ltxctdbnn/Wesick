import re

def passwordCheck(pwd):

    if len(pwd) < 8 or len(pwd) > 21 and not re.findall('[0-9]+', pwd) and not re.findall('[a-z]',pwd) or not re.findall('[A-Z]', pwd):
        print('비밀번호 기준(숫자, 영문 대소문자 구성)에 맞지 않습니다.')
        return False
    
    elif not re.findall('[~!@#$%^&*(),<.>/?]+', pwd):
        print('비밀번호는 최소 1개 이상의 특수문자가 포함되어야 합니다.')
        return False

    else:
        print('비밀번호의 길이, 숫자, 영문자 등 유효함')
        return True


