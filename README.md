# We Will Cook
เว็บแอพที่จะทำให้การปรุงนั้นง่ายขึ้น

## วิธีการรันโปรเจ็ค
**1. โคลนโปรเจ็คด้วย**
```console
git clone https://github.com/Rawitath/We-Will-Cook.git
```
**2. สร้าง venv โดยใช้**
```console
python -m venv .venv
```
**3. Activate venv ด้วย**<br>
* **Visual Studio Code**<br>
    1.เปิดโฟลเดอร์ที่โคลนมาด้วย VSCode<br>
    2.กด <code>Ctrl+Shift+P</code> สำหรับ Windows/Linux<br>
      หรือ <code>cmd+Shift+P</code> บน Mac<br>
      แล้วเลือก <code>Python:Select Intepreter</code><br>
    3.เลือก Intepreter ที่มี path เดียวกับ .venv ที่สร้างไว้
* **Command Prompt / Terminal**<br>
    1.พิมพ์<br>
        <code>.venv\Scripts\activate</code> สำหรับ Windows
        หรือ<br>
        <code>source .venv/bin/activate</code> สำหระบ MacOS/Linux<br>
        (รันแล้วจะมี (.venv) นำหน้า และต้อง activate ใหม่เมื่อเปิด Terminal อีกครั้ง)<br>
<!-- end of the list -->
**4. ลง dependencies ด้วย**<br>
```console
pip install -r requirements.txt
```
ไปที่โฟลเดอร์ frontend แล้วพิมพ์<br>
```console
npm install
```
**5. สร้างไฟล์ .env**<br>
สร้างไฟล์ชื่อ .env (ไม่มีชื่อตามด้วยสกุล .env) ในโฟลเดอร์หลัก (We-Will-Cook)<br>
<br>
**6. รันคำสั่งตามนี้**<br>
ในหน้า Command Prompt<br>
```console
python manage.py shell
```
Command Prompt จะกลายเป็น Python Shell ให้พิมพ์ตามนี้<br>
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```
จะได้ key มา ให้ copy ไว้<br>
<br>
**7. เขียนไฟล์ .env ตามนี้**
```
SECRET_KEY='((คีย์ที่ได้มา))'
DEBUG=False
EMAIL_USE_TLS=True
EMAIL_HOST='smtp.gmail.com'
EMAIL_HOST_USER='((Gmail สำหรับส่งข้อความ))'
EMAIL_HOST_PASSWORD='((รหัส App Password))'
EMAIL_PORT=587
```
**8. รันเซิฟเวอร์ backend ด้วย**
ไปที่โฟลเดอร์หลัก (We-Will-Cook) และพิมพ์ใน cmd
```console
python manage.py runserver
```
**9. รันเซิฟเวอร์ frontend โดย**<br>
ไปที่โฟลเดอร์ frontend และพิมพ์ใน cmd
```console
npm start
```
