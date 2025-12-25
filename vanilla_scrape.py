import requests
from bs4 import BeautifulSoup

# URL de la page de la liste des objets
base_url = "https://minecraft.fandom.com/fr/wiki/Objets"

# Fonction pour récupérer les données du sprite et du nom d'un objet
def get_object_details(url):
    # Requête pour obtenir le contenu de la page de l'objet
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
   
    # Extraire le nom de l'objet
    name_tag = soup.find('div', class_='mcwiki-header infobox-title')
    if name_tag:
        name = name_tag.text.strip()
    else:
        name = "Nom inconnu"
    
    # Extraire l'URL du sprite
    div_sprite = soup.find('div', class_='infobox-imagearea animated-container')
    if div_sprite:
        sprite_tag = div_sprite.find('a', class_='mw-file-description image')
        if sprite_tag:
            sprite_url = sprite_tag.get('href')
        else:
            sprite_url = "Sprite introuvable"
    else:
        sprite_url = "Sprite introuvable"
    
    return name, sprite_url

# Récupérer la liste des objets
def get_objects_list():
    # Requête pour obtenir le contenu de la page principale
    response = requests.get(base_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Trouver la section de la liste des objets
    object_list = []
    section = soup.find('span', {'id': 'Liste_des_objets'})
    if section:
        ul_tag = section
        for _ in range(1, 5): 
            ul_tag = ul_tag.find_next('ul')
            if ul_tag:
                # Chercher tous les liens <a> dans la section sans se baser uniquement sur la classe
                links = ul_tag.find_all('a', href=True)  # On cherche tous les liens avec un href
                for link in links:
                    href = link.get('href')
                    if href and href.startswith('/fr/wiki/'):  # Assurer qu'il s'agit d'un lien vers un objet
                        # Créer l'URL complète de l'objet
                        object_url = f"https://minecraft.fandom.com{href}"
                        name, sprite_url = get_object_details(object_url)
                        object_list.append({'name': name, 'sprite_url': sprite_url})
    return object_list

# Exécuter le scraping
if __name__ == "__main__":
    objects = get_objects_list()
    
    # Afficher les résultats
    for obj in objects:
        print(f"Nom : {obj['name']}")
        print(f"Sprite URL : {obj['sprite_url']}")
        print("-" * 50)
