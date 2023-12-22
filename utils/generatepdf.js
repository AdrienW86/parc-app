import 'jspdf-autotable';
import jsPDF from 'jspdf';

export const downloadPDF = (audit) => {
    if (!audit.pieces || audit.pieces.length === 0) {
      console.error('Aucune donnée à afficher dans le PDF.');
      return;
    }
  
    const pdf = new jsPDF();
    let currentY = 150;

    pdf.setFontSize(20); 
    pdf.setTextColor('#0060df')
    pdf.text(`Etat des lieux`, 15, 20);  
    pdf.text(`Les locaux`, 15, 50);
    pdf.text(`Le bailleur`, 15, 80);
    pdf.text(`Le locataire`, 105, 80);

    pdf.setTextColor('black')
    pdf.setFontSize(12);
    pdf.text(`Entrée, réalisé le : ${audit.date}`, 15, 30);  
    pdf.text(`Adresse: 264 lieu-dit Goûts `, 15, 60); 
    pdf.text(`Nom: Gutierrez`, 15, 90);
    pdf.text(`Prénom: François`, 15, 97);
    pdf.text(`Adresse du bien: 264 lieu-dit Goûts `, 15, 104); 
    pdf.text(`47190 Aiguillon `, 15, 111); 

    pdf.text(`Nom: ${audit.name} `, 105, 90);
    pdf.text(`Prénom: ${audit.firstname} `, 105, 97);
    pdf.text(`Adresse: ${audit.address.number} ${audit.address.street} `, 105, 104); 
    pdf.text(`${audit.address.zipcode} ${audit.address.city} `, 105, 111); 
    
    audit.pieces.forEach((el, index) => {

        const sectionTitle = `${el.title}`;
        pdf.setFontSize(18);
        pdf.setTextColor('#0060df');
        pdf.text(sectionTitle, 15, currentY-3 );

        const tableConfig = {
          startY: currentY ,
          margin: { top: 20, right: 15, bottom: 20, left: 15 }, 
          head: [['Eléments', 'Etat d\'entrée', 'Etat de sortie', 'Commentaires']],
          body: [
            ['Revêtement des sols', el.sol.label, '', el.sol.comment],
            ['Murs / Menuiseries', el.meubles.label, '', el.meubles.comment],
            ['Plafonds', el.plafond.label, '', el.plafond.comment],
            ['Electricité / Plomberie', el.electricity.label, '', el.electricity.comment]
          ],
          columnStyles: {
            0: { fontStyle: 'bold' },
            1: {},
            2: {},
            3: {}
          },
          bodyStyles: { fontStyle: 'normal' },
          split: { avoidPageSplit: false, }
        };

        pdf.autoTable(tableConfig);
        currentY = pdf.autoTable.previous.finalY + 30;
      });
  
const imageData = audit.userSignature; 
const imageData2 = audit.clientSignature

pdf.text(`Le bailleur`, 15, 220);
pdf.text(`Le locataire`, 105, 220);

pdf.setTextColor('black')
pdf.setFontSize(12);
pdf.text(`Entrée, le : ${audit.date}`, 15, 230);
pdf.text(`Entrée, le : ${audit.date}`, 105, 230);
pdf.addImage(imageData, 'JPEG', 15, 230, 50, 50); 
pdf.addImage(imageData2, 'JPEG', 105, 230, 50, 50); 
  
    pdf.save('etat_des_lieux.pdf');
  };