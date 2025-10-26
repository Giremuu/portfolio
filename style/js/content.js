// ================================
// CONTENUS DES CATÉGORIES
// ================================
export const bioContents = {
  aboutMe: `
    <p> Diplômé en <strong>cybersécurité</strong> puis passionné par les systèmes, les réseaux et l’automatisation, je <strong>construis pas à pas un parcours technique solide entre études, alternance et projets personnels.</strong><br><br>Mon objectif : M’installer durablement pour mettre <strong>mes compétences au service de ceux qui me feront confiance.</strong></p>
  `,
  
  parcours: `<div id="parcours-root"></div>`,

  competences: `
<div class="skills-list">
    <details class="skill-item" open>
      <summary class="skill-summary">Systèmes & Réseau</summary>
      <p class="skill-content">
        Windows Server (AD, DHCP, DNS...) / Modèles TCP-IP & OSI / Virtualisation (VMware) / Sauvegardes / Gestion de tickets (GLPI)
      </p>
    </details>

    <details class="skill-item">
      <summary class="skill-summary">Cybersécurité</summary>
      <p class="skill-content">
        Supervision (Zabbix, LibreNMS) / Bastion (Wallix, Teleport) / VPN / SSH - RDP / Analyse réseau (Wireshark) / RGPD
      </p>
    </details>

    <details class="skill-item">
      <summary class="skill-summary">Automatisation</summary>
      <p class="skill-content">
        Script PowerShell / Script Shell / Ansible
      </p>
    </details>

    <details class="skill-item">
      <summary class="skill-summary">Développement & Web</summary>
      <p class="skill-content">
        HTML - CSS - JS / Base de données (Firebase, PHP, MariaDB) / Python / Java
      </p>
    </details>

    <details class="skill-item">
      <summary class="skill-summary">Environnements</summary>
      <p class="skill-content">
        Windows 10 / Windows 11 / Windows Server / Android / Linux - Debian / Linux - Kali / Linux - Ubuntu
      </p>
    </details>
  </div>
  `,

  projets: `<p> Soon je le jure aussi </p>`,


  contact: `
    <div class="contact-actions" style="display:flex;gap:.6rem;flex-wrap:wrap">
      <a id="email-link" class="cat-btn" href="#" rel="nofollow noopener">Me contacter par email</a>
      <button id="reveal-email" class="cat-btn" data-b64="Z2lyZW11LmpwQGdtYWlsLmNvbQ==">Afficher l’email</button>
      <button id="copy-email" class="cat-btn" hidden>Copier l’email</button>
      <button class="cat-btn"> <p style="margin:0rem">Me retrouver sur GitHub : <a href="https://github.com/Giremuu" target="_blank" rel="noopener">Giremuu</a></p></button>
    </div>
  `
};
