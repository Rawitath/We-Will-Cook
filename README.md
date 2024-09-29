# We Will Cook
เว็บแอพที่จะทำให้การปรุงนั้นง่ายขึ้น

### สำหรับนักพัฒนา
วิธีใช้โปรเจ็ค :<br>
1.โคลนโปรเจ็คด้วย<br> <code>git clone https://github.com/Rawitath/We-Will-Cook.git</code><br>
2.สร้าง venv โดยใช้ <code>python -m venv .venv</code><br>
3.Activate venv ด้วย<br>
* Visual Studio Code<br>
    1.เปิดโฟลเดอร์ที่โคลนมาด้วย VSCode<br>
    2.กด <code>Ctrl+Shift+P</code> สำหรับ Windows/Linux หรือ <code>cmd+Shift+P</code> บน Mac แล้วเลือก <code>Python:Select Intepreter</code>
    3.เลือก Intepreter ที่มี path เดียวกับ .venv ที่สร้างไว้
* Command Prompt / Terminal<br>
    1.พิมพ์<br>
    <code>.venv\Scripts\activate</code> สำหรับ Windows
    หรือ<br>
    <code>source .venv/bin/activate</code> สำหระบ MacOS/Linux<br>
    (รันแล้วจะมี (.venv) นำหน้า และต้อง activate ใหม่เมื่อเปิด Terminal อีกครั้ง)<br>
4.ลง dependencies ด้วย<br>
<code>pip install -r requirements.txt</code><br>
<code>cd frontend</code><br>
<code>npm install</code><br>
<code>cd ..</code><br>
5.สร้างไฟล์ .env (ไม่มีชื่อตามด้วยสกุล .env)
6.รันคำสั่งตามนี้
<code>python manage.py shell</code><br>
<code>from django.core.management.utils import get_random_secret_key</code><br>
<code>print(get_random_secret_key())</code><br>
จะได้ key มา ให้ copy ไว้<br>
7. เขียนไฟล์ .env ตามนี้ :<br>
<code>SECRET_KEY='*((คีย์ที่ได้มา))*'</code><br>
<code>
DEBUG=True</code><br>
8.รันเซิฟเวอร์ backend ด้วย <code>python manage.py runserver</code><br>
ต.รันเซิฟเวอร์ frontend ด้วย<br>
<code>cd frontend</code>
<code>npm start</code>
