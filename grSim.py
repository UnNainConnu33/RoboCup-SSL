# coding: utf-8

# Ce script permet de lancer les différents terminaux nécessaire à l'utilisation de GrSim
import pyautogui, time
time.sleep(0.5)

# Ici, changer les valeurs en fonctions des dimensions de votre écran !
x = 1766
y = 835 

x2 = 3686
y2 = 886

print(""" .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| |    ______    | || |  _______     | || |    _______   | || |     _____    | || | ____    ____ | |
| |  .' ___  |   | || | |_   __ \    | || |   /  ___  |  | || |    |_   _|   | || ||_   \  /   _|| |
| | / .'   \_|   | || |   | |__) |   | || |  |  (__ \_|  | || |      | |     | || |  |   \/   |  | |
| | | |    ____  | || |   |  __ /    | || |   '.___`-.   | || |      | |     | || |  | |\  /| |  | |
| | \ `.___]  _| | || |  _| |  \ \_  | || |  |`\____) |  | || |     _| |_    | || | _| |_\/_| |_ | |
| |  `._____.'   | || | |____| |___| | || |  |_______.'  | || |    |_____|   | || ||_____||_____|| |
| |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------' \n""")

number = int(input(">>> [1] Big screen / [2] Small screen : "))

if number == 1 :

    # Lancement de network-gateway
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('cd network-gateway')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de game-data
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('cd game-data')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de bots-gateway
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('cd bots-gateway')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de bots-control
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('cd bots-control')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(1)

    # Lancement de bots-placement
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.moveTo(345, 995)
    pyautogui.typewrite('cd bots-placement')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de msb
    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('cd msb')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run repl')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de grSim

    """
    pyautogui.moveTo(23,1058)
    pyautogui.leftClick()
    time.sleep(0.5)

    """

    pyautogui.moveTo(x2, y2)
    pyautogui.leftClick()
    pyautogui.typewrite('grSim')
    pyautogui.press('enter')

elif number == 2 :

     # Lancement de network-gateway
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('cd network-gateway')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de game-data
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('cd game-data')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de bots-gateway
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('cd bots-gateway')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de bots-control
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('cd bots-control')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(1)

    # Lancement de bots-placement
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.moveTo(345, 995)
    pyautogui.typewrite('cd bots-placement')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run dev')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de msb
    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('cd msb')
    pyautogui.press('enter')
    pyautogui.typewrite('npm run repl')
    pyautogui.press('enter')
    time.sleep(0.5)

    # Lancement de grSim

    """
    pyautogui.moveTo(23,1058)
    pyautogui.leftClick()
    time.sleep(0.5)

    """

    pyautogui.moveTo(x, y)
    pyautogui.leftClick()
    pyautogui.typewrite('grSim')
    pyautogui.press('enter')

# --> Pour savoir la position de la souris :
"""
def troubleshoot():
    while True:
        print(pyautogui.position())
troubleshoot()
"""

