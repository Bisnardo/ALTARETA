
import { FormData, Translations } from '../types';

// These libraries are loaded from CDN in index.html, so we declare them globally for TypeScript
declare const jspdf: any;
declare const XLSX: any;
declare const JSZip: any;

const formatValue = (value: string | undefined | null, isBoolean = false, t: Translations) => {
    if (isBoolean) return value === 'si' ? t.si : t.no;
    return value || t.noEspecificado;
};

const getSummaryData = (formData: FormData, t: Translations) => {
    const fullAddress = `${formData.tipoVia} ${formData.nombreVia}, ${formData.numero}, ${formData.piso} ${formData.puerta}, ${formData.codigoPostal}, ${formData.poblacion}, ${formData.provincia}`;
    return [
        { section: t.step1Title, key: t.dniNie, value: formatValue(formData.dniNie, false, t) },
        { section: t.step1Title, key: t.nombre, value: formatValue(formData.nombre, false, t) },
        { section: t.step1Title, key: t.apellido1, value: formatValue(formData.apellido1, false, t) },
        { section: t.step1Title, key: t.apellido2, value: formatValue(formData.apellido2, false, t) },
        { section: t.step1Title, key: t.fechaNacimiento, value: formatValue(formData.fechaNacimiento, false, t) },
        { section: t.step1Title, key: t.nacionalidad, value: formatValue(formData.nacionalidad, false, t) },
        { section: t.step1Title, key: t.direccion, value: fullAddress },
        { section: t.step1Title, key: t.nombrePadre, value: formatValue(formData.nombrePadre, false, t) },
        { section: t.step1Title, key: t.nombreMadre, value: formatValue(formData.nombreMadre, false, t) },
        { section: t.step1Title, key: t.telefono, value: formatValue(formData.telefono, false, t) },
        { section: t.step1Title, key: t.email, value: formatValue(formData.email, false, t) },

        { section: t.step2Title, key: t.fechaLlegada, value: formatValue(formData.fechaLlegada, false, t) },
        { section: t.step2Title, key: t.resideMas183Dias, value: formatValue(formData.resideMas183Dias, true, t) },
        ...(formData.resideMas183Dias === 'no' ? [{ section: t.step2Title, key: t.paisResidenciaFiscal, value: formatValue(formData.paisResidenciaFiscal, false, t) }] : []),
        { section: t.step2Title, key: t.comentariosLlegada, value: formatValue(formData.comentariosLlegada, false, t) },

        { section: t.step3Title, key: t.iban, value: formatValue(formData.iban, false, t) },
        { section: t.step3Title, key: t.cuentaAbiertaCon, value: formatValue(formData.cuentaAbiertaCon, false, t) },
        { section: t.step3Title, key: t.actividadDefinida, value: formatValue(formData.actividadDefinida, true, t) },
        { section: t.step3Title, key: t.descripcionActividad, value: formatValue(formData.descripcionActividad, false, t) },
        { section: t.step3Title, key: t.situacionLaboral, value: formatValue(formData.situacionLaboral, true, t) },

        { section: t.step4Title, key: t.ejerceEnLocal, value: formatValue(formData.ejerceEnLocal, true, t) },
        { section: t.step4Title, key: t.mutua, value: formatValue(formData.mutua, false, t) },
        { section: t.step4Title, key: t.rendimientoNetoPrevisto, value: formatValue(formData.rendimientoNetoPrevisto, false, t) + ' €' },
        { section: t.step4Title, key: t.operaIntracomunitario, value: formatValue(formData.operaIntracomunitario, true, t) },
        { section: t.step4Title, key: t.disfrutaTarifaReducida, value: formatValue(formData.disfrutaTarifaReducida, true, t) },
        ...(formData.disfrutaTarifaReducida === 'no' ? [{ section: t.step4Title, key: t.baseCotizacionElegida, value: formatValue(formData.baseCotizacionElegida, false, t) + ' €' }] : []),
        { section: t.step4Title, key: t.incluirBeneficiarios, value: formatValue(formData.incluirBeneficiarios, true, t) },
        
        { section: t.comentariosFinales, key: t.comentariosFinales, value: formatValue(formData.comentariosFinales, false, t) },
    ];
};

const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const generatePdf = (formData: FormData, t: Translations) => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const data = getSummaryData(formData, t);
    const clientName = `${formData.nombre} ${formData.apellido1} ${formData.apellido2}`;

    doc.setFontSize(18);
    doc.text(t.mainTitle, 14, 22);
    doc.setFontSize(11);
    doc.text(`${t.nombre}: ${clientName}`, 14, 30);
    doc.setFontSize(11);
    
    const groupedData = data.reduce((acc, item) => {
        (acc[item.section] = acc[item.section] || []).push([item.key, item.value]);
        return acc;
    }, {} as Record<string, [string, string][]>);

    let startY = 40;
    for (const sectionTitle in groupedData) {
        if (startY > 260) {
            doc.addPage();
            startY = 20;
        }
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(sectionTitle, 14, startY);
        startY += 2;
        doc.autoTable({
            startY: startY,
            head: [[ t.campo, t.valor ]],
            body: groupedData[sectionTitle],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] },
            didDrawPage: (data: any) => {
                startY = data.cursor.y + 10;
            }
        });
        startY = doc.autoTable.previous.finalY + 10;
    }

    const pdfBlob = doc.output('blob');
    downloadBlob(pdfBlob, `${t.resumenAlta}_${formData.apellido1 || t.cliente}.pdf`);
};

export const generateXlsx = (formData: FormData, t: Translations) => {
    const data = getSummaryData(formData, t);
    const worksheetData = data.map(item => ({ [t.seccion]: item.section, [t.campo]: item.key, [t.valor]: item.value }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, t.resumenCliente);
    XLSX.writeFile(wb, `${t.resumenAlta}_${formData.apellido1 || t.cliente}.xlsx`);
};

export const generateTxt = (formData: FormData, t: Translations) => {
    const data = getSummaryData(formData, t);
    let content = `${t.mainTitle}\n`;
    content += `${t.cliente}: ${formData.nombre} ${formData.apellido1} ${formData.apellido2}\n\n`;
    
    let currentSection = "";
    data.forEach(item => {
        if (item.section !== currentSection) {
            content += `\n--- ${item.section.toUpperCase()} ---\n`;
            currentSection = item.section;
        }
        // For comments, don't repeat the section title as the key
        const key = item.key === item.section ? '' : `${item.key}: `;
        content += `${key}${item.value}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, `${t.resumenAlta}_${formData.apellido1 || t.cliente}.txt`);
};

export const generateBenetZip = (formData: FormData, t: Translations) => {
    const zip = new JSZip();
    const clientIdentifier = formData.apellido1 || t.cliente;

    // PDF
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const data = getSummaryData(formData, t);
    const groupedData = data.reduce((acc, item) => {
        (acc[item.section] = acc[item.section] || []).push([item.key, item.value]);
        return acc;
    }, {} as Record<string, [string, string][]>);
    let startY = 20;
    for (const sectionTitle in groupedData) {
        doc.setFontSize(14);
        doc.text(sectionTitle, 14, startY);
        doc.autoTable({ startY: startY + 2, head: [[t.campo, t.valor]], body: groupedData[sectionTitle] });
        startY = doc.autoTable.previous.finalY + 10;
    }
    const pdfBlob = doc.output('blob');
    zip.file(`Resumen_PDF_${clientIdentifier}.pdf`, pdfBlob);

    // JSON
    const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    zip.file(`Datos_JSON_${clientIdentifier}.json`, jsonBlob);

    zip.generateAsync({type:"blob"}).then(function(content) {
        downloadBlob(content, `${t.paraBenet}_${clientIdentifier}.zip`);
    });
};
