import pyautogui, time
time.sleep(0.5)

# Lancement de network-gateway
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd network-gateway')
pyautogui.press('enter')
pyautogui.typewrite('npm run dev')
pyautogui.press('enter')
time.sleep(0.5)

# Lancement de game-data
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd game-data')
pyautogui.press('enter')
pyautogui.typewrite('npm run dev')
pyautogui.press('enter')
time.sleep(0.5)

# Lancement de bots-gateway
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd bots-gateway')
pyautogui.press('enter')
pyautogui.typewrite('npm run dev')
pyautogui.press('enter')
time.sleep(0.5)

# Lancement de bots-control
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd bots-control')
pyautogui.press('enter')
pyautogui.typewrite('npm run dev')
pyautogui.press('enter')
time.sleep(1)

# Lancement de bots-placement
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd bots-placement')
pyautogui.press('enter')
pyautogui.typewrite('npm run dev')
pyautogui.press('enter')
time.sleep(0.5)

# Lancement de msb
pyautogui.moveTo(1768, 844)
pyautogui.leftClick()
pyautogui.moveTo(345, 995)
pyautogui.typewrite('cd msb')
pyautogui.press('enter')
pyautogui.typewrite('npm run repl')
pyautogui.press('enter')
time.sleep(0.5)

# Lancement de grSim
pyautogui.moveTo(23,1058)
pyautogui.leftClick()
pyautogui.typewrite('grSim')
pyautogui.press('enter')


""" 

# --> Pour savoir la position de la souris :

def troubleshoot():
    while True:
        print(pyautogui.position())
troubleshoot()

"""
