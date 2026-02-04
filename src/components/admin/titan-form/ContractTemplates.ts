import { TitanFormData } from "./types";

export function generateContractHTML(data: TitanFormData): string {
    const isRent = data.tipoNegocio === "Arriendo";
    const isAlliance = data.rolUsuario === "Agente";

    // Format currency
    const precioFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(data.precioVenta);

    // Commission Logic Calculation
    let comisionTexto = "";
    if (isAlliance) {
        if (isRent) {
            if (data.tiempoArrendamiento && data.tiempoArrendamiento <= 24) comisionTexto = "UN (1) CANON de arrendamiento";
            else if (data.tiempoArrendamiento && data.tiempoArrendamiento > 24 && data.tiempoArrendamiento <= 60) comisionTexto = "DOS (2) CÁNONES de arrendamiento";
            else comisionTexto = "TRES (3) CÁNONES de arrendamiento";
            comisionTexto += ", monto que será distribuido en partes iguales (50% y 50%) entre LAS PARTES ALIADAS";
        } else {
            // Venta
            const isRural = data.categoria === "Campestre" || ["Finca", "Lote / Terreno", "Lote"].some(t => data.tipoInmueble.includes(t));
            const porcentaje = isRural ? "CINCO POR CIENTO (5%)" : "TRES POR CIENTO (3%)";
            comisionTexto = `el ${porcentaje} sobre el valor final de venta, distribuido en partes iguales (50% y 50%) entre LAS PARTES ALIADAS`;
        }
    } else {
        // Corretaje Normal
        if (isRent) {
            // Standard rent commission usually 1 canon per year or similar, using simplest standard for now or what user implied
            comisionTexto = "el valor correspondiente al primer canon de arrendamiento (más IVA si aplica)";
        } else {
            const isRural = data.categoria === "Campestre" || ["Finca", "Lote / Terreno", "Lote"].some(t => data.tipoInmueble.includes(t));
            const porcentaje = isRural ? "CINCO POR CIENTO (5%)" : "TRES POR CIENTO (3%)";
            comisionTexto = `el ${porcentaje} sobre el valor total de la venta`;
        }
    }

    const currentDate = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    // Template switch
    if (isAlliance) {
        return getAllianceTemplate(data, precioFormat, comisionTexto, currentDate);
    } else {
        return getBrokerageTemplate(data, precioFormat, comisionTexto, currentDate);
    }
}

function getBrokerageTemplate(data: TitanFormData, precio: string, comision: string, date: string) {
    return `
    <div style="font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; background: white;">
      <h2 style="text-align: center; text-transform: uppercase; margin-bottom: 30px;">CONTRATO DE CORRETAJE INMOBILIARIO</h2>
      
      <p>Entre los suscritos a saber:</p>
      
      <p>De una parte, <strong>VECY BIENES RAÍCES S.A.S</strong>, actuando como <strong>EL CORREDOR</strong>; y por la otra parte <strong>${data.propietarioNombre.toUpperCase()}</strong>, identificado con ${data.propietarioDocumentoTipo} No. ${data.propietarioDocumentoNumero}, quien en adelante se denominará <strong>EL CONSIGNANTE</strong> (o PROPIETARIO), hemos convenido celebrar el presente CONTRATO DE CORRETAJE, regido por los artículos 1340 a 1353 del Código de Comercio de Colombia y las siguientes cláusulas:</p>
      
      <h3 style="margin-top: 20px;">PRIMERA. OBJETO:</h3>
      <p>EL CONSIGNANTE faculta a EL CORREDOR para intermediar en la ${data.tipoNegocio.toUpperCase()} del inmueble ubicado en la ciudad de ${data.ciudad}, barrio ${data.barrio}, dirección ${data.direccion} ${data.direccionSecundaria || ''}, con un área privada aproximada de ${data.areaPrivada} m².</p>
      
      <h3>SEGUNDA. PRECIO:</h3>
      <p>El precio base para la negociación se fija en la suma de <strong>${precio}</strong>. Este valor podrá ser modificado de mutuo acuerdo entre las partes.</p>
      
      <h3>TERCERA. HONORARIOS (COMISIÓN):</h3>
      <p>En caso de realizarse el negocio efectivo con un cliente presentado por EL CORREDOR, EL CONSIGNANTE pagará a título de honorarios ${comision}.</p>
      
      <h3>CUARTA. EXCLUSIVIDAD:</h3>
      <p>Este contrato ${data.exclusividad === 'Si' ? '<strong>SÍ INCLUYE</strong> pacto de exclusividad' : '<strong>NO INCLUYE</strong> pacto de exclusividad, por lo que EL CONSIGNANTE podrá ofrecer el inmueble por otros medios'}.</p>
      
      <h3>QUINTA. VIGENCIA:</h3>
      <p>El presente contrato tendrá una vigencia de ciento ochenta (180) días calendario, prorrogables automáticamente salvo notificación escrita en contrario con 30 días de antelación.</p>
      
      <div style="margin-top: 50px;">
         <p>Para constancia se firma digitalmente a los ${date}.</p>
         
         <div style="margin-top: 40px; display: flex; justify-content: space-between;">
             <div style="border-top: 1px solid #000; width: 45%; padding-top: 10px;">
                 <strong>EL CORREDOR</strong><br>
                 VECY BIENES RAÍCES
             </div>
             
             <div style="border-top: 1px solid #000; width: 45%; padding-top: 10px;">
                 <strong>EL CONSIGNANTE</strong><br>
                 ${data.propietarioNombre}<br>
                 ${data.propietarioDocumentoTipo}: ${data.propietarioDocumentoNumero}
                 <br>
                 <img src="${data.firmaDigital || ''}" style="max-height: 60px; margin-top: -50px; opacity: 0.8;" />
             </div>
         </div>
      </div>
    </div>
  `;
}

function getAllianceTemplate(data: TitanFormData, precio: string, comision: string, date: string) {
    return `
    <div style="font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; background: white;">
      <h2 style="text-align: center; text-transform: uppercase; margin-bottom: 30px;">ACUERDO DE ALIANZA ESTRATÉGICA INMOBILIARIA</h2>
      
      <p>Entre los suscritos:</p>
      
      <p><strong>VECY BIENES RAÍCES S.A.S</strong> y <strong>${data.propietarioNombre.toUpperCase()}</strong> (Colega Agente Inmobiliario), hemos acordado celebrar la presente ALIANZA ESTRATÉGICA para la comercialización conjunta del inmueble:</p>
      
      <p><strong>Inmueble:</strong> ${data.tipoInmueble} ubicado en ${data.ciudad} (${data.direccion}) para el negocio de ${data.tipoNegocio.toUpperCase()}.</p>
      
      <h3>ACUERDOS DE COOPERACIÓN:</h3>
      
      <ol>
        <li><strong>COMISIÓN COMPARTIDA:</strong> En caso de cierre exitoso, los honorarios correspondientes a ${comision} serán facturados al cliente final y repartidos al 50/50 entre VECY y EL COLEGA, previo descuento de retenciones de ley si aplican.</li>
        
        <li><strong>RESPONSABILIDADES:</strong> Ambas partes se comprometen a promocionar el inmueble con diligencia y ética profesional, respetando la información confidencial del cliente.</li>
        
        <li><strong>CLIENTE REGISTRADO:</strong> Se respetará la protección del cliente ("Punta") que cada parte aporte a la negociación.</li>
      </ol>
      
      <p>Se suscribe a los ${date}.</p>
      
      <div style="margin-top: 40px; display: flex; justify-content: space-between;">
         <div style="border-top: 1px solid #000; width: 45%; padding-top: 10px;">
             <strong>VECY BIENES RAÍCES</strong>
         </div>
         <div style="border-top: 1px solid #000; width: 45%; padding-top: 10px;">
             <strong>EL COLEGA AGENTE</strong><br>
             ${data.propietarioNombre}
             <br>
             <img src="${data.firmaDigital || ''}" style="max-height: 60px; margin-top: -50px; opacity: 0.8;" />
         </div>
      </div>
    </div>
  `;
}
