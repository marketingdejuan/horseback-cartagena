import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, BadgeCheck, CheckCircle2, Compass, ArrowRight, Home, ChevronRight 
} from 'lucide-react';

const URL_SITIO = 'https://cabalgatamedellin.com';
const WHATSAPP_DEFAULT = '573000000000';

interface FilaComparativa {
  criterio: string;
  nosotros: string;
  otros: string;
}

interface PaginaSEO {
  slug: string;
  enlaceCorto: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  precioTexto: string;
  precioNumero: string;
  whatsappMsg: string;
  introH2: string;
  parrafos: string[];
  incluye: string[];
  detallesH2: string;
  detallesTexto: string;
  tablaTitulo: string;
  tablaColNosotros: string;
  tablaColOtros: string;
  tablaFilas: FilaComparativa[];
  faqs: { q: string; a: string }[];
}

export const PAGINAS_SEO: PaginaSEO[] = [
  {
    slug: 'planes-cabalgatas-medellin',
    enlaceCorto: 'Planes y Paquetes de Cabalgatas',
    metaTitle: 'Planes de Cabalgatas en Medellín: Grupal, Privado, Romántico y VIP',
    metaDescription: 'Compara nuestros 4 paquetes de cabalgatas en Medellín y Caldas: Plan Grupal de fin de semana, Plan Privado Exclusivo, Plan Celebración con almuerzo y Plan VIP con transporte.',
    badge: '🐎 4 Paquetes Diseñados para Cada Tipo de Viajero',
    h1: 'Planes y Paquetes de Cabalgatas en Medellín y Caldas, Antioquia',
    subtitle: 'Elige entre recorridos grupales de fin de semana, cabalgatas 100% privadas a tu propio ritmo o paquetes todo incluido con almuerzo campestre, decoración y transporte.',
    precioTexto: 'Paquetes desde $100.000 COP / persona',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero cotizar uno de los paquetes de cabalgatas en Medellín y Caldas. 🐎',
    introH2: '¿Cuál de nuestros 4 planes de cabalgata se adapta mejor a tu grupo?',
    parrafos: [
      'En Cabalgata Medellín hemos estructurado 4 paquetes completos en la Vereda Salinas de Caldas, Antioquia, a solo 30 minutos de El Poblado y Laureles sin pagar peajes.',
      '1) Plan Grupal ($100.000 COP/persona): disponible sábados y domingos a las 2:00 PM sin cobro adicional de guía. 2) Plan Privado Exclusivo ($100.000 COP/persona + $80.000 guía del grupo): disponible todos los días a las 10:00 AM, 2:00 PM y 4:00 PM exclusivamente para ti y tus acompañantes.',
      '3) Plan Celebración (+$30.000 COP almuerzo y decoración festiva, gratis para grupos de 6 o más personas) y 4) Plan Aventura VIP (+$130.000 COP por vehículo privado ida y vuelta desde tu hotel en El Poblado o Laureles).'
    ],
    incluye: [
      'Recorrido guiado de 2 horas por senderos ecológicos y miradores de Caldas.',
      'Inducción práctica de manejo equino y asignación de caballo según tu nivel.',
      'Póliza de asistencia médica individual con Magenta Seguros.',
      'Acompañamiento de guía baquiano experto durante toda la ruta.',
      'Opciones adicionales de almuerzo típico ($30.000) y transporte VIP ($130.000).'
    ],
    detallesH2: 'Diferencias clave entre modalidad grupal y paquetes privados',
    detallesTexto: 'Si viajas en pareja, con niños pequeños o deseas paradas fotográficas a tu propio ritmo, te recomendamos los paquetes privados (Privado, Celebración o VIP). Si vienes con amigos un fin de semana a las 2:00 PM, el Plan Grupal te permite ahorrar el costo del guía.',
    tablaTitulo: 'Comparativa de Paquetes en Cabalgata Medellín',
    tablaColNosotros: 'Modalidad / Paquete',
    tablaColOtros: 'Tarifa y Beneficio Principal',
    tablaFilas: [
      { criterio: 'Plan Grupal (Sáb y Dom 2 PM)', nosotros: '$100.000 COP / persona', otros: 'Guía incluido ($0 costo extra)' },
      { criterio: 'Plan Privado (Lun a Dom)', nosotros: '$100.000 COP + $80.000 guía grupo', otros: '100% exclusivo (10 AM, 2 PM o 4 PM)' },
      { criterio: 'Plan Celebración con Almuerzo', nosotros: '$130.000 COP + guía grupo', otros: 'Decoración GRATIS desde 6 personas' },
      { criterio: 'Plan Aventura VIP con Transporte', nosotros: 'Plan + $130.000 transporte carro', otros: 'Recogida puerta a puerta en hotel' }
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia entre el Plan Grupal y el Plan Privado?',
        a: 'El Plan Grupal se realiza únicamente sábados y domingos a las 2:00 PM y no tiene costo extra de guía ($100.000 por persona). El Plan Privado se puede reservar cualquier día a las 10:00 AM, 2:00 PM o 4:00 PM exclusivamente para tu grupo, sumando un único pago de $80.000 por el guía privado.'
      },
      {
        q: '¿Con cuánta anticipación debo reservar mi paquete?',
        a: 'Para fines de semana y festivos recomendamos reservar con 24 a 48 horas de anticipación. Entre semana puedes reservar incluso el mismo día sujeto a disponibilidad.'
      },
      {
        q: '¿Qué métodos de pago aceptan para confirmar la reserva?',
        a: 'Puedes confirmar por WhatsApp mediante transferencia por Bancolombia o Nequi y cancelar el saldo restante al llegar a la finca.'
      }
    ]
  },
  {
    slug: 'tour-cuatrimotos-medellin-caldas',
    enlaceCorto: 'Tour de Cuatrimotos en Medellín',
    metaTitle: 'Tour de Cuatrimotos en Medellín y Caldas | 1.5 Horas de Adrenalina ($250.000)',
    metaDescription: 'Vive el mejor tour de cuatrimotos cerca de Medellín en Caldas, Antioquia (a 30 min de El Poblado). 1.5 horas por trochas de montaña desde $250.000 COP por máquina.',
    badge: '🏍️ Ruta Off-Road de 1.5 Horas en Montaña',
    h1: 'Tour de Cuatrimotos en Medellín y Caldas, Antioquia: Aventura Off-Road',
    subtitle: 'Domina trochas reales de montaña, barro, bosques nativos y miradores panorámicos en cuatrimotos automáticas a solo 30 minutos del sur de Medellín.',
    precioTexto: '$250.000 COP / cuatrimoto (+ $50.000 parrillero)',
    precioNumero: '250000',
    whatsappMsg: '¡Hola! Quiero reservar el Tour de Cuatrimotos en Caldas, Antioquia. 🏍️',
    introH2: 'Adrenalina pura en cuatrimotos a 30 minutos de El Poblado',
    parrafos: [
      'Si buscas un plan de motor y aventura cerca de la ciudad sin perder horas en el tráfico hacia el Oriente antioqueño, nuestro Tour de Cuatrimotos en la Vereda Salinas (Caldas, Antioquia) te ofrece terrenos off-road auténticos a tan solo 30 minutos de El Poblado y Laureles.',
      'Durante 1.5 horas conducirás cuatrimotos automáticas de alto torque por senderos veredales, ascensos de montaña, pasos de agua y miradores naturales del Sur del Valle de Aburrá. El alquiler por máquina para 1 conductor es de $250.000 COP, y puedes llevar un acompañante (parrillero) por solo $50.000 COP adicionales ($300.000 COP en total para 2 personas).',
      'Además, somos el único operador en el sur del Valle de Aburrá donde puedes combinar en un mismo día un tour de cuatrimotos con una cabalgata ecológica para grupos mixtos.'
    ],
    incluye: [
      'Alquiler de cuatrimoto automática de alto cilindraje por 1.5 horas de ruta guiada.',
      'Casco certificado de seguridad e inducción práctica de conducción desde cero.',
      'Guía líder en ruta para asistirte en pasos técnicos y tomar fotos y videos.',
      'Póliza de asistencia médica con Magenta Seguros incluida.',
      'Opción de agregar parrillero/acompañante por solo $50.000 COP adicionales.'
    ],
    detallesH2: 'Requisitos técnicos y de seguridad para el Tour en Cuatrimoto',
    detallesTexto: 'Las cuatrimotos son 100% automáticas (acelerador y freno). El conductor debe ser mayor de edad (o adolescente de 16+ años con autorización de sus padres presente) y los niños desde los 8 años pueden ir como acompañantes (parrilleros). Es obligatorio usar calzado cerrado.',
    tablaTitulo: 'Especificaciones del Tour de Cuatrimotos en Caldas',
    tablaColNosotros: 'Nuestro Tour en Caldas (Sur)',
    tablaColOtros: 'Alquileres en Oriente Antioqueño',
    tablaFilas: [
      { criterio: 'Tarifa por Cuatrimoto (1.5 Horas)', nosotros: '$250.000 COP (Guía incluido)', otros: '$280.000 a $350.000 COP (1 Hora)' },
      { criterio: 'Tarifa Acompañante (Parrillero)', nosotros: '+$50.000 COP ($300.000 pareja)', otros: '+$80.000 a $100.000 COP' },
      { criterio: 'Distancia desde El Poblado', nosotros: '30 minutos (Sin peajes)', otros: '60 a 90 minutos (+ Peajes)' },
      { criterio: 'Edad Conductor / Parrillero', nosotros: 'Conductor adulto / Parrillero 8+ años', otros: 'Restricciones variables' },
      { criterio: 'Equipamiento y Seguro', nosotros: 'Casco certificado + Magenta Seguros', otros: 'Básico' }
    ],
    faqs: [
      {
        q: '¿Es difícil manejar las cuatrimotos si soy principiante?',
        a: 'No. Nuestras cuatrimotos son automáticas (acelerador y freno, sin cambios manuales). Antes de iniciar la ruta en la montaña realizamos una inducción práctica para que te sientas 100% seguro.'
      },
      {
        q: '¿Pueden ir dos personas en una misma cuatrimoto?',
        a: 'Sí, nuestras máquinas tienen fuerza suficiente para dos personas. El valor para el conductor es de $250.000 COP y el acompañante (parrillero) tiene un costo adicional de $50.000 COP ($300.000 COP en total por la pareja).'
      },
      {
        q: '¿Podemos combinar cuatrimotos y cabalgata en el mismo grupo?',
        a: '¡Por supuesto! Si en tu grupo algunos prefieren montar a caballo y otros quieren adrenalina en cuatrimoto, pueden agendar ambas experiencias en nuestra sede de Caldas.'
      }
    ]
  },
  {
    slug: 'cabalgata-romantica-parejas-medellin',
    enlaceCorto: 'Cabalgata Romántica para Parejas',
    metaTitle: 'Cabalgata Romántica para Parejas en Medellín | Aniversarios y Cumpleaños',
    metaDescription: 'Sorprende a tu pareja con una cabalgata privada romántica cerca de Medellín. Incluye guía exclusivo, miradores en la montaña, almuerzo especial y decoración.',
    badge: '❤️ Plan Exclusivo para Parejas, Aniversarios y Propuestas',
    h1: 'Cabalgata Romántica para Parejas en Medellín: Plan Privado y Celebración',
    subtitle: 'Escápate de la rutina con un recorrido a caballo 100% privado por las montañas de Antioquia, almuerzo especial y decoración para sorprender a tu persona favorita.',
    precioTexto: 'Pareja Privada ($280.000) o Con Almuerzo y Decoración ($390.000)',
    precioNumero: '280000',
    whatsappMsg: '¡Hola! Quiero cotizar una Cabalgata Romántica para pareja (Aniversario / Celebración). ❤️🐎',
    introH2: 'El plan romántico más original a 30 minutos de El Poblado',
    parrafos: [
      'Si estás cansado de los mismos restaurantes en Provenza o El Poblado para celebrar un aniversario, cumpleaños o pedir matrimonio, una cabalgata privada al aire libre por los miradores de Caldas es una experiencia que tu pareja jamás olvidará.',
      'En nuestro Plan Celebración para parejas, ustedes dos cabalgan de forma 100% exclusiva (sin desconocidos en el grupo). Nuestro guía los acompaña a una distancia prudente para garantizar su seguridad, guiarlos por los paisajes más bonitos del bosque y tomarles fotografías y videos increíbles juntos.',
      'Al regresar del recorrido de 2 horas, los espera una mesa reservada con decoración especial ($50.000 COP) y almuerzo campestre ($30.000 COP por persona).'
    ],
    incluye: [
      'Recorrido 100% privado para la pareja en el horario que elijas (10 AM, 2 PM o 4 PM).',
      'Guía exclusivo que actúa como fotógrafo de la pareja en los miradores.',
      'Opción de almuerzo especial ($30.000 COP/persona) al finalizar la ruta.',
      'Opción de mesa decorada con globos y detalles para aniversario o cumpleaños ($50.000 COP).',
      'Seguro médico Magenta Seguros para ambos jinetes.'
    ],
    detallesH2: 'Mejor horario para una cabalgata romántica en pareja',
    detallesTexto: 'Te recomendamos el turno de las 4:00 PM si deseas disfrutar la luz dorada del atardecer en las montañas de Antioquia, o el turno de las 10:00 AM para cerrar con un almuerzo campestre privado.',
    tablaTitulo: 'Opciones de Cabalgata Romántica para 2 Personas',
    tablaColNosotros: 'Detalle para la Pareja (2 Personas)',
    tablaColOtros: 'Tarifa Total Pareja',
    tablaFilas: [
      { criterio: 'Cabalgata Privada Base (2 Jinetes + Guía)', nosotros: '2 horas privadas + fotos en mirador', otros: '$280.000 COP Total Pareja' },
      { criterio: 'Plan Pareja + 2 Almuerzos Campestres', nosotros: 'Ruta privada + 2 almuerzos completos', otros: '$340.000 COP Total Pareja' },
      { criterio: 'Plan Celebración Completo (Con Decoración)', nosotros: 'Ruta privada + 2 almuerzos + mesa decorada', otros: '$390.000 COP Total Pareja' },
      { criterio: 'Adicional Transporte VIP Puerta a Puerta', nosotros: 'Recogida ida y regreso en hotel / casa', otros: '+$130.000 COP por el vehículo' }
    ],
    faqs: [
      {
        q: '¿Mi pareja nunca ha montado a caballo, es seguro para ella/él?',
        a: 'Totalmente seguro. Asignamos caballos sumamente nobles y tranquilos, damos una charla práctica antes de salir y el guía va pendiente de ustedes todo el camino al paso que se sientan cómodos.'
      },
      {
        q: '¿Cuánto cuesta en total la cabalgata privada para 2 personas?',
        a: 'La cabalgata privada base para 2 personas cuesta $280.000 COP en total ($100.000 por cada jinete + $80.000 del guía privado). Si deseas agregar los 2 almuerzos (+$60.000) y decoración (+$50.000), el plan completo celebración para la pareja queda en $390.000 COP.'
      },
      {
        q: '¿Pueden ayudarme a organizar una sorpresa o pedida de mano?',
        a: '¡Claro que sí! Escríbenos por WhatsApp y coordinamos en secreto la parada en el mirador o la decoración a tu llegada para que sea una sorpresa perfecta.'
      }
    ]
  },
  {
    slug: 'cabalgatas-ninos-familias-medellin',
    enlaceCorto: 'Cabalgatas para Niños y Familias',
    metaTitle: 'Cabalgatas para Niños y Familias en Medellín | Caballos Mansos (Desde 3 Años)',
    metaDescription: 'El mejor plan familiar cerca de Medellín: cabalgatas ecológicas seguras para niños desde los 3 años y principiantes. Caballos dóciles y póliza Magenta Seguros.',
    badge: '👨‍👩‍👧‍👦 Plan 100% Familiar — Niños desde los 3 Años',
    h1: 'Cabalgatas para Niños y Familias en Medellín: Caballos Mansos y Seguros',
    subtitle: 'Desconecta a tus hijos de las pantallas y regálales un día inolvidable de contacto con los caballos y la naturaleza a solo 30 minutos de Medellín.',
    precioTexto: '$100.000 COP / jinete (Póliza médica incluida)',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero información para hacer una cabalgata familiar con niños. 👨‍👩‍👧‍👦🐎',
    introH2: 'Seguridad extrema para niños, abuelos y principiantes',
    parrafos: [
      'Sabemos que cuando buscas una cabalgata familiar en Medellín, tu prioridad número uno es la tranquilidad y seguridad de tus hijos. En Cabalgata Medellín no alquilamos caballos briosos ni de fiesta: nuestra manada está entrenada específicamente para el turismo ecológico y familiar.',
      'Recibimos niños a partir de los 3 años de edad (acompañados por un adulto). Antes de iniciar la ruta, nuestros guías evalúan la edad y confianza de cada niño e integrante de la familia para asignarle el caballo perfecto por mansedumbre y tamaño.',
      'Además, todas nuestras salidas cuentan con cobertura de asistencia médica a través de Magenta Seguros, y en los planes familiares de más de 6 personas con almuerzo te obsequiamos la decoración si están celebrando un cumpleaños.'
    ],
    incluye: [
      'Caballos seleccionados por su temperamento dócil para niños (desde 3 años) y principiantes.',
      'Inducción personalizada para que los niños aprendan a conectar con su caballo sin miedo.',
      'Guías pacientes y atentos durante las 2 horas de recorrido ecológico.',
      'Póliza médica individual de Magenta Seguros para niños y adultos.',
      'Ambiente 100% familiar, libre de desórdenes o consumo excesivo de alcohol.'
    ],
    detallesH2: 'Recomendaciones para ir con niños a la cabalgata',
    detallesTexto: 'Los niños deben llevar pantalón largo (sudadera o jean cómodo), tenis cerrados, bloqueador solar y gorra. El peso máximo permitido para los adultos es de 110 kg.',
    tablaTitulo: 'Estándares de Seguridad Familiar en Nuestra Finca',
    tablaColNosotros: 'Cabalgata Medellín (Sede Caldas)',
    tablaColOtros: 'Cabalgatas Informales / Ferias',
    tablaFilas: [
      { criterio: 'Edad Mínima Permitida', nosotros: 'Desde los 3 años (Con acompañamiento)', otros: 'Sin protocolo infantil claro' },
      { criterio: 'Temperamento del Caballo', nosotros: 'Mansos, nobles y de paso suave', otros: 'Caballos briosos o cansados' },
      { criterio: 'Asistencia Médica', nosotros: 'Póliza individual Magenta Seguros', otros: 'Sin cobertura médica' },
      { criterio: 'Terreno del Recorrido', nosotros: 'Sendero ecológico sin carros', otros: 'Calles pavimentadas con tráfico' }
    ],
    faqs: [
      {
        q: '¿Desde qué edad pueden montar a caballo los niños?',
        a: 'Recibimos niños desde los 3 años de edad siempre que vayan acompañados en el recorrido por sus padres o un adulto responsable y con supervisión directa de nuestro guía.'
      },
      {
        q: '¿Es mejor reservar cabalgata privada o grupal cuando vamos con niños pequeños?',
        a: 'Si van con niños pequeños (de 3 a 8 años), recomendamos el Plan Privado porque el guía lleva el ritmo exacto de tu familia, haciendo las paradas que los niños necesiten.'
      },
      {
        q: '¿Qué pasa si empieza a llover durante el paseo con los niños?',
        a: 'Si es una llovizna suave, entregamos ponchos impermeables para todos. Si hay lluvia fuerte o tormenta antes de salir, reprogramamos tu reserva familiar sin ningún costo.'
      }
    ]
  },
  {
    slug: 'cabalgata-vip-transporte-el-poblado-laureles',
    enlaceCorto: 'Cabalgata VIP con Transporte',
    metaTitle: 'Cabalgata VIP en Medellín con Transporte desde El Poblado y Laureles',
    metaDescription: 'Reserva nuestra Cabalgata VIP Todo Incluido en Medellín: recogida puerta a puerta en El Poblado o Laureles, cabalgata privada, guía exclusivo y almuerzo.',
    badge: '🚘 Recogida Puerta a Puerta en Hotel o Airbnb',
    h1: 'Cabalgata VIP con Transporte desde El Poblado y Laureles (Todo Incluido)',
    subtitle: 'La experiencia ecuestre más cómoda de Medellín para turistas y locales: te recogemos en tu hotel o apartamento, cabalgas en privado, almuerzas y te llevamos de regreso.',
    precioTexto: 'Plan Privado + Almuerzo + $130.000 COP Transporte VIP',
    precioNumero: '260000',
    whatsappMsg: '¡Hola! Quiero reservar la Cabalgata VIP con transporte ida y vuelta desde Medellín. 🚘🐎',
    introH2: 'Olvídate de manejar: nosotros nos encargamos de toda la logística',
    parrafos: [
      'Si estás de visita en Medellín hospedado en El Poblado, Provenza, Manila, Laureles, Envigado o Sabaneta, nuestro Plan Aventura VIP está diseñado para que vivas las montañas de Antioquia sin preocuparte por conseguir transporte de regreso desde la vereda.',
      'Un vehículo privado te recoge directamente en la puerta de tu hotel o Airbnb, te lleva en un trayecto corto de 30 minutos hacia el sur hasta nuestra finca en Caldas, te espera mientras disfrutas de las 2 horas de cabalgata privada y del almuerzo campestre, y te regresa sano y salvo a tu hospedaje.',
      'El servicio de transporte VIP ida y vuelta tiene una tarifa plana de solo $130.000 COP adicionales por el vehículo para tu grupo (desde cualquier punto del sur hasta Laureles).'
    ],
    incluye: [
      'Transporte privado ida y vuelta desde El Poblado, Laureles, Envigado, Sabaneta o Itagüí.',
      'Cabalgata 100% privada de 2 horas con guía exclusivo para tu grupo.',
      'Almuerzo tradicional incluido al finalizar el recorrido a caballo.',
      'Póliza de asistencia médica con Magenta Seguros.',
      'Atención bilingüe o en español por WhatsApp desde el momento de tu reserva.'
    ],
    detallesH2: 'Cobertura del transporte VIP en el Área Metropolitana',
    detallesTexto: 'Cubrimos sin recargo extra toda la zona sur del Valle de Aburrá (El Poblado, Envigado, Sabaneta, Itagüí, La Estrella, Caldas) y hasta el sector de Laureles / Estadio en Medellín.',
    tablaTitulo: 'Logística de Transporte hacia Nuestra Finca en Caldas',
    tablaColNosotros: 'Nuestro Transporte VIP ($130.000 ida y vuelta)',
    tablaColOtros: 'Transporte por Cuenta Propia',
    tablaFilas: [
      { criterio: 'Recogida en El Poblado / Laureles', nosotros: 'En la puerta de tu Hotel o Airbnb', otros: 'Debes solicitar taxi o Uber de ida' },
      { criterio: 'Regreso desde la Vereda Salinas', nosotros: 'El conductor te espera en la finca', otros: 'Baja disponibilidad de apps en vereda' },
      { criterio: 'Tiempo de Trayecto', nosotros: '30 minutos directo (0 Peajes)', otros: '30 a 45 minutos según espera' },
      { criterio: 'Capacidad del Vehículo', nosotros: 'Hasta 4 pasajeros por automóvil', otros: 'Variable' }
    ],
    faqs: [
      {
        q: '¿El precio de $130.000 COP de transporte es por persona o por el carro?',
        a: 'Es por el servicio de transporte del grupo (hasta 4 pasajeros en automóvil cómodo), incluye tanto la recogida en tu hotel en Medellín como el regreso al finalizar la experiencia.'
      },
      {
        q: '¿Cuánto tiempo dura toda la experiencia VIP incluyendo el transporte?',
        a: 'Debes calcular aproximadamente 4 a 4.5 horas en total desde que te recogemos en El Poblado o Laureles (30-40 min de ida, 2.5 horas entre cabalgata e inducción, 45 min de almuerzo y 30-40 min de regreso).'
      },
      {
        q: '¿También podemos pedir Uber por nuestra cuenta si no tomamos el plan VIP?',
        a: 'Sí, Uber, DiDi, InDrive y taxis amarillos llegan hasta Caldas sin problema. Sin embargo, para el regreso desde la vereda es mucho más cómodo y rápido tener nuestro transporte VIP asegurado.'
      }
    ]
  },
  {
    slug: 'alquiler-caballos-medellin-precios',
    enlaceCorto: 'Alquiler de Caballos por Horas',
    metaTitle: 'Alquiler de Caballos en Medellín por Horas | Tarifas por Jinete y Requisitos',
    metaDescription: 'Servicio formal de alquiler de caballos en Medellín por horas: ejemplares criollos mansos, aperaje completo, guía baquiano y seguro médico en Caldas, Antioquia.',
    badge: '🐎 Alquiler Equino Formal por Horas con Aperaje Completo',
    h1: 'Alquiler de Caballos en Medellín por Horas: Tarifas por Tiempo y Requisitos',
    subtitle: 'Alquila caballos criollos dóciles, bien herrados y descansados para travesías de 2 horas en montaña, con silla acolchada, estribos a medida y seguro médico.',
    precioTexto: '$100.000 COP por caballo (Bloque de 2 horas)',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero consultar disponibilidad para alquiler de caballos por horas. 🐎',
    introH2: '¿Cómo funciona el alquiler de caballos por horas cerca de Medellín?',
    parrafos: [
      'A diferencia de los potreros cerrados donde alquilas un caballo por 15 o 30 minutos para dar vueltas en círculo, nuestro servicio de alquiler de caballos en la Vereda Salinas (Caldas) comprende un bloque completo de 2 horas de travesía real por senderos de montaña.',
      'La tarifa de alquiler es de $100.000 COP por caballo ensillado (equivalente a $50.000 COP por cada hora efectiva de monta). Incluye el aperaje tradicional antioqueño revisado antes de cada salida, freno suave, inducción técnica y póliza de accidentes de Magenta Seguros.',
      'En el turno grupal de sábados y domingos a las 2:00 PM solo pagas el valor de cada caballo ($100.000 COP). Si prefieres alquilar los caballos en un turno privado para tu grupo cualquier día de la semana, solo agregas $80.000 COP por el guía baquiano acompañante.'
    ],
    incluye: [
      'Alquiler de caballo criollo durante 2 horas continuas de senderismo ecuestre.',
      'Aperaje completo: silla acolchada, zamarros/estribos ajustados a tu estatura y riendas.',
      'Emparejamiento técnico según peso del jinete (máximo 110 kg) y nivel de monta.',
      'Póliza médica activa durante las 2 horas con Magenta Seguros.',
      'Guía montado de apoyo para abrir ruta en los senderos de la Vereda Salinas.'
    ],
    detallesH2: 'Protocolo de bienestar equino y requisitos para alquilar',
    detallesTexto: 'No alquilamos caballos para cabalgatas urbanas con licor ni sobre pavimento. Cada ejemplar cumple turnos estrictos de descanso y pastoreo, con un tope máximo de 110 kg por jinete.',
    tablaTitulo: 'Desglose de Tarifas de Alquiler por Número de Jinetes (2 Horas)',
    tablaColNosotros: 'Modalidad Privada (Cualquier Día)',
    tablaColOtros: 'Modalidad Grupal (Sáb/Dom 2 PM)',
    tablaFilas: [
      { criterio: 'Alquiler para 1 Jinete (2 Horas)', nosotros: '$180.000 COP ($100k caballo + $80k guía)', otros: '$100.000 COP Total' },
      { criterio: 'Alquiler para 2 Jinetes (2 Horas)', nosotros: '$280.000 COP ($140.000 por persona)', otros: '$200.000 COP Total' },
      { criterio: 'Alquiler para 4 Jinetes (2 Horas)', nosotros: '$480.000 COP ($120.000 por persona)', otros: '$400.000 COP Total' },
      { criterio: 'Alquiler para 6 Jinetes (2 Horas)', nosotros: '$680.000 COP ($113.300 por persona)', otros: '$600.000 COP Total' }
    ],
    faqs: [
      {
        q: '¿Alquilan caballos sin guía para salir solos?',
        a: 'Por normatividad de seguridad turística y para mantener activa la cobertura de la póliza de Magenta Seguros, todos los alquileres van acompañados por nuestro guía baquiano, quien se adapta al paso que ustedes deseen llevar.'
      },
      {
        q: '¿Cuál es el peso máximo permitido para alquilar un caballo?',
        a: 'Por respeto y cuidado de la columna de nuestros caballos criollos, el peso máximo permitido por jinete es de 110 kilogramos.'
      },
      {
        q: '¿Se puede alquilar por menos de 2 horas?',
        a: 'La ruta ecológica por los miradores y bosques de la Vereda Salinas está diseñada para completarse en un circuito de 2 horas, por lo que manejamos tarifa unificada de $100.000 COP por recorrido completo.'
      }
    ]
  },
  {
    slug: 'cabalgatas-grupos-empresas-medellin',
    enlaceCorto: 'Cabalgatas para Grupos y Empresas',
    metaTitle: 'Cabalgatas para Grupos y Empresas en Medellín | Integraciones y Eventos',
    metaDescription: 'Organiza tu integración empresarial, despedida o salida grupal con nuestras cabalgatas en Medellín y Caldas. Almuerzo, cuatrimotos, seguro médico y decoración gratis (+6 pax).',
    badge: '🎉 Decoración GRATIS para Grupos de 6+ Personas en Plan Celebración',
    h1: 'Cabalgatas para Grupos, Empresas y Celebraciones en Medellín',
    subtitle: 'El escenario ideal para integraciones corporativas, cumpleaños en grupo, despedidas de soltero(a) y reencuentros familiares cerca de Medellín.',
    precioTexto: '$100.000 COP / persona (+ Decoración Gratis en grupos 6+)',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero cotizar una cabalgata para un grupo / empresa. 🎉🐎',
    introH2: 'Experiencias grupales a caballo con logística completa',
    parrafos: [
      'Organizar una actividad al aire libre para un grupo de amigos, una familia numerosa o un equipo de trabajo en Medellín requiere puntualidad, seguridad médica y capacidad operativa. En nuestra sede de Caldas contamos con una caballada amplia y mansa para atender grupos privados con total comodidad.',
      'Cuando reservas para más de 6 personas en nuestro Plan Celebración (que incluye el recorrido privado a caballo y almuerzo por $30.000 COP adicionales por persona), te regalamos la decoración completa de la mesa (ahorras $50.000 COP) para festejar cumpleaños, grados o logros empresariales.',
      'Además, como todos los asistentes están cubiertos por la póliza de asistencia médica de Magenta Seguros, las áreas de Recursos Humanos y organizadores de eventos cuentan con total respaldo de seguridad.'
    ],
    incluye: [
      'Recorrido privado exclusivo para tu grupo o empresa sin mezclar con desconocidos.',
      'Guías adicionales según el tamaño del grupo para garantizar atención personalizada.',
      'Decoración de celebración GRATIS al reservar para 6 o más personas con almuerzo.',
      'Póliza médica individual de Magenta Seguros para cada participante.',
      'Posibilidad de combinar cabalgata y tour de cuatrimotos en la misma jornada.'
    ],
    detallesH2: 'Cómo cotizar una salida grupal o empresarial',
    detallesTexto: 'Usa nuestro cotizador en línea o escríbenos por WhatsApp indicando la fecha tentativa y el número de asistentes para bloquear tus cupos y preparar el menú de almuerzo.',
    tablaTitulo: 'Beneficios para Grupos y Eventos Corporativos',
    tablaColNosotros: 'Grupos de 6 o Más Personas',
    tablaColOtros: 'Grupos de 2 a 5 Personas',
    tablaFilas: [
      { criterio: 'Tarifa Base Cabalgata (2 Horas)', nosotros: '$100.000 COP por participante', otros: '$100.000 COP por participante' },
      { criterio: 'Costo de Guía Exclusivo', nosotros: '$80.000 COP dividido en todo el grupo', otros: '$80.000 COP por el grupo' },
      { criterio: 'Decoración en Plan Celebración', nosotros: '¡GRATIS! (Ahorras $50.000 COP)', otros: '+$50.000 COP opcional' },
      { criterio: 'Póliza Magenta Seguros y Soporte', nosotros: 'Incluida para cada integrante + Cuenta cobro', otros: 'Incluida para cada integrante' }
    ],
    faqs: [
      {
        q: '¿Cuál es el número máximo de personas que pueden ir en un mismo grupo?',
        a: 'Manejamos grupos desde 2 hasta 20+ personas coordinando turnos y guías adicionales. Escríbenos por WhatsApp con el tamaño de tu grupo para confirmar disponibilidad de ejemplares.'
      },
      {
        q: '¿Qué pasa si en el grupo de la empresa hay personas que les da miedo montar a caballo?',
        a: 'Nuestros guías hacen una inducción especial para principiantes nerviosos con los caballos más mansos, o bien pueden esperarnos en la finca disfrutando del paisaje y sumarse al almuerzo grupal.'
      },
      {
        q: '¿Entregan soporte o cuenta de cobro para empresas?',
        a: 'Sí, somos un operador turístico formal en Antioquia y suministramos los soportes requeridos para reservas corporativas.'
      }
    ]
  },
  {
    slug: 'donde-montar-a-caballo-cerca-de-medellin',
    enlaceCorto: 'Dónde Montar a Caballo en Medellín',
    metaTitle: 'Dónde Montar a Caballo Cerca de Medellín | Comparativa Sur vs Oriente',
    metaDescription: 'Guía completa sobre dónde montar a caballo cerca de Medellín: descubre por qué Caldas (Sur, a 30 min sin peajes) supera a las rutas congestionadas del Oriente.',
    badge: '🧭 Guía Comparativa para Elegir tu Cabalgata en Antioquia',
    h1: 'Dónde Montar a Caballo Cerca de Medellín: Guía de Rutas, Tiempos y Precios',
    subtitle: 'Compara tiempos de viaje, costos de peajes, tipos de senderos y precios antes de elegir dónde hacer tu próxima cabalgata en el Valle de Aburrá.',
    precioTexto: 'Planes desde $100.000 COP (0 Peajes desde Medellín)',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Vi la guía de dónde montar a caballo cerca de Medellín y quiero reservar en Caldas. 🐎',
    introH2: 'Sur del Valle de Aburrá (Caldas) vs. Oriente Antioqueño (Rionegro / Guarne)',
    parrafos: [
      'Cuando buscas dónde montar a caballo cerca de Medellín, las dos zonas principales son el Oriente Antioqueño (Santa Elena, Guarne, Rionegro) y el Sur del Valle de Aburrá (Caldas, Vereda Salinas). Muchos turistas eligen el Oriente sin saber que implica pagar peajes de más de $34.000 COP ida y vuelta y enfrentar trancones de más de 1 hora en el Túnel de Oriente o la Autopista Medellín-Bogotá.',
      'En cambio, nuestra ruta ecológica en la Vereda Salinas de Caldas está a solo 30 minutos reales desde El Poblado, Envigado, Sabaneta y Laureles, sin pagar un solo peaje. El clima templado de montaña de Caldas (entre 18°C y 24°C) permite cabalgar cómodamente tanto en la mañana como en la tarde.',
      'Además, mientras que en otros sitios el precio por persona supera los $120.000 o $150.000 COP por recorridos cortos sobre rieles pavimentados, en Cabalgata Medellín disfrutas de 2 horas completas por senderos de tierra y bosque nativo desde $100.000 COP con póliza de Magenta Seguros incluida.'
    ],
    incluye: [
      'Ahorro de tiempo: a solo 30 minutos del sur de Medellín (El Poblado / Envigado / Sabaneta).',
      'Ahorro de dinero: $0 en peajes (frente a los peajes costosos hacia Rionegro o Guarne).',
      'Senderos 100% naturales de montaña y bosque nativo en la Vereda Salinas.',
      'Tarifa competitiva desde $100.000 COP por 2 horas reales de cabalgata.',
      'Respaldo de +150 reseñas 5.0 estrellas y seguro médico incluido.'
    ],
    detallesH2: 'Consejos clave antes de elegir dónde cabalgar en Medellín',
    detallesTexto: 'Verifica siempre tres cosas antes de reservar: 1) Que el precio incluya póliza de asistencia médica real, 2) Que el recorrido sea por senderos ecológicos y no por calles pavimentadas que lastiman las patas de los caballos, y 3) El tiempo real de desplazamiento desde tu ubicación.',
    tablaTitulo: 'Comparativa de Zonas Ecuestres Cerca de Medellín',
    tablaColNosotros: 'Caldas - Vereda Salinas (Sur)',
    tablaColOtros: 'Oriente Antioqueño (Rionegro / Guarne)',
    tablaFilas: [
      { criterio: 'Tiempo desde El Poblado / Laureles', nosotros: '30 minutos por Autopista Sur', otros: '60 a 90 minutos según tráfico' },
      { criterio: 'Peajes Ida y Regreso', nosotros: '$0 COP (Sin peajes)', otros: '$34.000 a $48.000 COP' },
      { criterio: 'Superficie del Camino', nosotros: 'Tierra blanda y bosque nativo', otros: 'Tramos altos de rieles de concreto' },
      { criterio: 'Tarifa Base (2 Horas con Seguro)', nosotros: '$100.000 COP (Magenta Seguros)', otros: '$130.000 a $160.000 COP' }
    ],
    faqs: [
      {
        q: '¿Cuál es el lugar más cercano a El Poblado para montar a caballo?',
        a: 'La Vereda Salinas en Caldas (Sur del Valle de Aburrá) está a solo 30 minutos de El Poblado y Envigado avanzando directo hacia el sur, sin peajes y con acceso directo.'
      },
      {
        q: '¿Por qué es mejor cabalgar en senderos de tierra que en rieles de concreto?',
        a: 'Los senderos de tierra y bosque nativo en Caldas amortiguan el paso del caballo, evitando lesiones articulares en el animal y haciendo el paseo mucho más suave, fresco y silencioso para el jinete.'
      },
      {
        q: '¿Se puede ir en transporte público o Metro hasta cerca de la cabalgata?',
        a: 'Puedes tomar el Metro de Medellín hasta la estación La Estrella (última estación del sur) y desde allí tomar un taxi o Uber de solo 12 a 15 minutos hasta nuestra finca en Caldas.'
      }
    ]
  },
  {
    slug: 'en-horseback-riding-medellin-tours',
    enlaceCorto: 'Horseback Riding Medellin (EN Guide)',
    metaTitle: 'Private Horseback Riding Medellin & ATV Tours | 30 Mins from El Poblado',
    metaDescription: 'Book the best private horseback riding and ATV tours near Medellin, Colombia. Located in Caldas (30 mins from El Poblado). Gentle horses, insurance & VIP transport.',
    badge: '🇺🇸🇨🇴 Top-Rated Eco Tour — 30 Mins South of El Poblado',
    h1: 'Private Horseback Riding & Ecological Tours in Medellin, Colombia',
    subtitle: 'Escape the city noise and ride gentle, well-cared-for Colombian horses through native cloud forests and mountain viewpoints in Caldas, Antioquia.',
    precioTexto: 'From $100,000 COP (~$25 USD) / person',
    precioNumero: '100000',
    whatsappMsg: 'Hello! I want to book a Private Horseback Riding tour near Medellin. 🇺🇸🐎',
    introH2: 'Why Foreign Travelers Choose Our Ranch in Caldas Over Eastern Medellin',
    parrafos: [
      'Looking for an authentic Colombian horseback riding experience near Medellin without spending hours in traffic? Our ecological ranch is located in Vereda Salinas (Caldas, Antioquia), just 30 minutes south of El Poblado and Laureles with zero highway tolls.',
      'We specialize in private tours for couples, solo travelers, families, and groups of friends. Whether it is your very first time on a horse or you are an experienced rider, we match you with a gentle horse and provide a full safety briefing plus medical insurance with Magenta Seguros.',
      'Want a worry-free day? Choose our VIP Adventure Plan which includes round-trip private transportation directly from your hotel or Airbnb in El Poblado or Laureles, a 2-hour private mountain ride, and a traditional Colombian lunch.'
    ],
    incluye: [
      '2-hour guided mountain trail ride through native forests and scenic viewpoints.',
      'Well-cared-for, gentle horses suitable for complete beginners and kids (3+ years old).',
      'Full medical assistance insurance included (Magenta Seguros).',
      'Optional VIP round-trip private transport from El Poblado / Laureles (+$130,000 COP per car).',
      'Optional 1.5-hour off-road ATV Tour ($250,000 COP) at the same ranch.'
    ],
    detallesH2: 'Transparent Local Pricing in Colombian Pesos (COP)',
    detallesTexto: 'We charge fair local prices with no "gringo tax": $100,000 COP per rider (~$25 USD) plus a one-time $80,000 COP (~$20 USD) private guide fee per group on private schedules, or $0 guide fee on Saturday/Sunday 2:00 PM group rides.',
    tablaTitulo: 'Quick Comparison: Our Caldas Ranch vs. Eastern Medellin Tours',
    tablaColNosotros: 'Medellin Horseback Riding (Caldas - South)',
    tablaColOtros: 'Other Operators (East / Rionegro)',
    tablaFilas: [
      { criterio: 'Drive Time from El Poblado', nosotros: '30 minutes (Zero highway tolls)', otros: '60 to 90 minutes (+ Tolls)' },
      { criterio: 'Base Price (2-Hour Ride)', nosotros: '$100,000 COP (~$25 USD)', otros: '$150,000 - $220,000 COP' },
      { criterio: 'Medical Insurance', nosotros: 'Included (Magenta Seguros)', otros: 'Often not included' },
      { criterio: 'Min. Age / Max. Rider Weight', nosotros: 'From 3 years old / Up to 110 kg (240 lbs)', otros: 'Varies' }
    ],
    faqs: [
      {
        q: 'How do I get to the ranch from El Poblado or Laureles?',
        a: 'You can easily take an Uber or taxi directly to our ranch in Caldas (30-40 minutes, approximately $35,000 - $45,000 COP), or book our VIP Plan which includes private round-trip pickup and drop-off at your hotel or Airbnb for $130,000 COP total.'
      },
      {
        q: 'Are the horses healthy and well-treated?',
        a: 'Yes! Animal welfare is our #1 rule. Our horses graze in open pastures, get rest between rides, receive regular veterinary care, and we enforce a strict 110 kg (240 lbs) rider weight limit.'
      },
      {
        q: 'Can I book last-minute for today or tomorrow?',
        a: 'Yes! On weekdays we often have same-day or next-day availability for private rides at 10:00 AM, 2:00 PM, or 4:00 PM. Just message us on WhatsApp to confirm your spot.'
      }
    ]
  },
  {
    slug: 'reservar',
    enlaceCorto: 'Reservar Cabalgata en Línea',
    metaTitle: 'Reservar Cabalgata en Medellín y Caldas | Confirmación por WhatsApp',
    metaDescription: 'Reserva tu cabalgata ecológica o tour de cuatrimotos en Medellín y Caldas (a 30 min de El Poblado). Horarios 10:00 AM, 2:00 PM y 4:00 PM desde $100.000 COP.',
    badge: '📅 Reserva Rápida — Cupos Diarios 10 AM, 2 PM y 4 PM',
    h1: 'Reservar Cabalgata en Medellín y Caldas, Antioquia',
    subtitle: 'Asegura tus cupos en menos de 2 minutos para cabalgatas privadas, grupales de fin de semana, planes románticos o tours en cuatrimoto.',
    precioTexto: 'Desde $100.000 COP / persona',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero hacer una reserva de cabalgata en Medellín / Caldas. 📅🐎',
    introH2: '¿Cómo funciona el proceso de reserva en Cabalgata Medellín?',
    parrafos: [
      'Reservar tu experiencia a caballo en la Vereda Salinas de Caldas (a solo 30 minutos de El Poblado y Laureles sin peajes) es totalmente rápido y seguro. Solo debes elegir la fecha, el horario (10:00 AM, 2:00 PM o 4:00 PM) y el número de jinetes.',
      'Recuerda que los sábados y domingos a las 2:00 PM contamos con modalidad de Cabalgata Grupal ($100.000 COP por persona, sin costo extra de guía). En cualquier otro día u horario disfrutarás de una Cabalgata 100% Privada para tu grupo adicionando únicamente $80.000 COP por el guía exclusivo.',
      'Todas las reservas incluyen inducción práctica para principiantes, caballo asignado según tu nivel y póliza de asistencia médica individual con Magenta Seguros.'
    ],
    incluye: [
      'Reserva garantizada de caballos criollos mansos para la fecha y hora elegida.',
      'Póliza de asistencia médica activa con Magenta Seguros.',
      'Envío inmediato del pin exacto de ubicación en Google Maps / Waze.',
      'Opción de adicionar almuerzo ($30.000 COP) o Transporte VIP ($130.000 COP).',
      'Reprogramación sin costo en caso de tormenta eléctrica o clima severo.'
    ],
    detallesH2: 'Políticas de reserva, niños y bienestar animal',
    detallesTexto: 'Recibimos niños desde los 3 años de edad acompañados de un adulto. Por bienestar de nuestros caballos, el peso máximo permitido es de 110 kg por jinete.',
    tablaTitulo: 'Resumen de Horarios y Turnos de Reserva',
    tablaColNosotros: 'Horario de Salida',
    tablaColOtros: 'Modalidades Disponibles',
    tablaFilas: [
      { criterio: 'Turno Mañana (10:00 AM)', nosotros: 'Lunes a Domingo', otros: 'Cabalgata Privada, VIP y Cuatrimotos' },
      { criterio: 'Turno Tarde (2:00 PM)', nosotros: 'Lunes a Viernes Privada / Sáb-Dom Grupal', otros: 'Grupal ($0 guía) o Privada exclusiva' },
      { criterio: 'Turno Atardecer (4:00 PM)', nosotros: 'Lunes a Domingo', otros: 'Cabalgata Privada, Romántica y Cuatrimotos' }
    ],
    faqs: [
      {
        q: '¿Con cuánto dinero se separa la reserva?',
        a: 'Escríbenos por WhatsApp o usa nuestro cotizador en línea para verificar disponibilidad inmediata en tu fecha y coordinar el abono de confirmación.'
      },
      {
        q: '¿Puedo reservar para hoy mismo o para mañana?',
        a: 'Sí, de lunes a viernes solemos tener disponibilidad el mismo día, y los fines de semana recomendamos reservar con al menos 24 a 48 horas de anticipación.'
      },
      {
        q: '¿Qué pasa si llueve el día de mi reserva?',
        a: 'En lluvia suave entregamos ponchos impermeables gratuitos. Si hay tormenta fuerte antes de iniciar, puedes reprogramar tu fecha sin ninguna penalidad.'
      }
    ]
  },
  {
    slug: 'consultar',
    enlaceCorto: 'Consultar Disponibilidad y Dudas',
    metaTitle: 'Consultar Disponibilidad, Precios y Horarios | Cabalgata Medellín',
    metaDescription: 'Consulta disponibilidad en tiempo real, tarifas de grupos, requisitos de peso/edad y transporte para tu cabalgata en Medellín y Caldas, Antioquia.',
    badge: '💬 Atención Inmediata y Cotizaciones Personalizadas',
    h1: 'Consultar Disponibilidad y Tarifas de Cabalgatas en Medellín',
    subtitle: 'Resuelve todas tus dudas sobre horarios, transporte desde El Poblado o Laureles, planes para niños, grupos empresariales y celebraciones especiales.',
    precioTexto: 'Planes desde $100.000 COP / persona',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero consultar disponibilidad y precios para una cabalgata. 💬🐎',
    introH2: 'Información clave antes de tu visita a la Vereda Salinas, Caldas',
    parrafos: [
      'En esta página reunimos toda la información operativa que necesitas consultar antes de vivir nuestra cabalgata ecológica de 2 horas en el Sur del Valle de Aburrá. Estamos ubicados en la Vereda Salinas de Caldas, Antioquia, a tan solo 30 minutos de El Poblado, Envigado, Sabaneta y Laureles.',
      'Si viajas en vehículo particular, taxi o Uber, llegarás por vía pavimentada sin pagar un solo peaje. Si prefieres que nos encarguemos de todo, puedes consultar por nuestro Plan Aventura VIP que incluye transporte privado ida y vuelta desde tu hotel o Airbnb.',
      'También atendemos consultas para eventos corporativos, despedidas y cumpleaños, donde los grupos de más de 6 personas que toman el Plan Celebración reciben la decoración festiva completamente gratis.'
    ],
    incluye: [
      'Asesoría personalizada en español e inglés vía WhatsApp.',
      'Cotización transparente sin cobros ocultos para parejas, familias o empresas.',
      'Información detallada de rutas a caballo (2 horas) y cuatrimotos (1.5 horas).',
      'Cobertura médica con Magenta Seguros en todos los planes.',
      'Parqueadero privado gratuito en nuestra finca de Caldas.'
    ],
    detallesH2: 'Resumen rápido de requisitos operativos',
    detallesTexto: 'Edad mínima: 3 años. Peso máximo: 110 kg. Vestuario obligatorio: pantalón largo y zapatos cerrados. Horarios diarios: 10:00 AM, 2:00 PM y 4:00 PM.',
    tablaTitulo: 'Ficha Técnica Rápida de Nuestras Experiencias',
    tablaColNosotros: 'Servicio / Regla Operativa',
    tablaColOtros: 'Detalle Verificado',
    tablaFilas: [
      { criterio: 'Ubicación Exacta', nosotros: 'Vereda Salinas, Caldas, Antioquia', otros: 'A 30 min de El Poblado (Sin peajes)' },
      { criterio: 'Cabalgata Ecológica (2 Horas)', nosotros: '$100.000 COP por jinete', otros: 'Niños desde 3 años / Peso máx. 110 kg' },
      { criterio: 'Tour de Cuatrimotos (1.5 Horas)', nosotros: '$250.000 COP máquina (+$50k parrillero)', otros: 'Automáticas / Casco incluido' },
      { criterio: 'Asistencia Médica', nosotros: 'Magenta Seguros', otros: 'Incluida en el 100% de las reservas' }
    ],
    faqs: [
      {
        q: '¿Cómo consulto si hay cupo para este fin de semana?',
        a: 'Haz clic en el botón verde de WhatsApp en esta página indicando cuántos jinetes son y si prefieres el horario de las 10:00 AM, 2:00 PM o 4:00 PM.'
      },
      {
        q: '¿Tienen guías que hablen inglés para turistas extranjeros?',
        a: 'Sí, atendemos turistas extranjeros todos los días y contamos con información completa en inglés en nuestra sección Horseback Riding Medellin.'
      },
      {
        q: '¿Se puede ir sin saber montar a caballo?',
        a: 'Sí, el 100% de nuestras rutas incluyen inducción previa y caballos mansos aptos para personas sin ninguna experiencia.'
      }
    ]
  }
];

export const dynamicParams = true;

export async function generateStaticParams() {
  return PAGINAS_SEO.map((pagina) => ({
    slug: pagina.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = decodeURIComponent(resolvedParams?.slug || '').trim().toLowerCase();
  const pagina = PAGINAS_SEO.find((p) => p.slug === rawSlug);

  if (!pagina) {
    return { title: 'Página no encontrada | Cabalgata Medellín' };
  }

  const urlCompleta = `${URL_SITIO}/${pagina.slug}`;
  const isEnglish = pagina.slug.startsWith('en-');

  return {
    title: pagina.metaTitle,
    description: pagina.metaDescription,
    alternates: {
      canonical: urlCompleta,
      languages: isEnglish
        ? {
            'es-CO': URL_SITIO,
            'en-US': urlCompleta,
            'x-default': URL_SITIO,
          }
        : undefined,
    },
    openGraph: {
      title: pagina.metaTitle,
      description: pagina.metaDescription,
      url: urlCompleta,
      siteName: isEnglish ? 'Medellin Horseback Riding' : 'Cabalgata Medellín',
      locale: isEnglish ? 'en_US' : 'es_CO',
      type: 'website',
    },
  };
}

export default async function SEOLandingPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = decodeURIComponent(resolvedParams?.slug || '').trim().toLowerCase();
  const pagina = PAGINAS_SEO.find((p) => p.slug === rawSlug);

  if (!pagina) {
    notFound();
  }

  const isEnglish = pagina.slug.startsWith('en-');

  let whatsappNum = WHATSAPP_DEFAULT;
  try {
    const res = await fetch('https://admin.cabalgatas.co/api/ajustes?brandName=cabalgatamedellin.com', {
      next: { revalidate: 300 }
    });
    if (res.ok) {
      const ajustes = await res.json();
      if (ajustes.whatsappNumber) whatsappNum = ajustes.whatsappNumber;
    }
  } catch (e) {
    // Fallback al número por defecto
  }

  const linkWhatsApp = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(pagina.whatsappMsg)}`;
  const urlActual = `${URL_SITIO}/${pagina.slug}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEnglish ? "Medellin Horseback Riding" : "Cabalgatas en Medellín",
            "item": URL_SITIO
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pagina.enlaceCorto,
            "item": urlActual
          }
        ]
      },
      {
        "@type": ["TouristTrip", "Product"],
        "name": pagina.h1,
        "description": pagina.metaDescription,
        "url": urlActual,
        "image": `${URL_SITIO}/cabalgatas-en-medellin-y-caldas.webp`,
        "brand": {
          "@type": "Brand",
          "name": isEnglish ? "Medellin Horseback Riding" : "Cabalgata Medellín"
        },
        "offers": {
          "@type": "Offer",
          "url": urlActual,
          "priceCurrency": "COP",
          "price": pagina.precioNumero,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": pagina.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div lang={isEnglish ? 'en' : 'es'} className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />

      {/* BARRA DE NAVEGACIÓN SUPERIOR COMPLETA PARA EVITAR PÁGINAS HUÉRFANAS */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <Link href={isEnglish ? "/en" : "/"} className="font-extrabold text-base md:text-lg tracking-tight text-white hover:text-amber-400 transition-colors">
            🐎 {isEnglish ? "Medellin Horseback Riding" : "Cabalgata Medellín"}
          </Link>
          <nav aria-label={isEnglish ? "Main Navigation" : "Navegación Principal"} className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm font-bold text-zinc-300">
            <Link href={isEnglish ? "/en" : "/"} className="hover:text-amber-400 transition-colors">
              {isEnglish ? "Home" : "Inicio"}
            </Link>
            <Link href="/planes-cabalgatas-medellin" className="hover:text-amber-400 transition-colors">
              {isEnglish ? "Packages" : "Planes"}
            </Link>
            <Link href="/cabalgatas-caldas" className="hover:text-amber-400 transition-colors">
              Caldas
            </Link>
            <Link href="/tour-cuatrimotos-medellin-caldas" className="hover:text-amber-400 transition-colors">
              {isEnglish ? "ATV Tour" : "Cuatrimotos"}
            </Link>
            <Link href="/cabalgata-romantica-parejas-medellin" className="hover:text-amber-400 transition-colors hidden sm:inline">
              {isEnglish ? "Couples" : "Parejas"}
            </Link>
            <Link href="/blog" className="hover:text-amber-400 transition-colors hidden md:inline">
              Blog
            </Link>
            <Link href="/reservar" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-3.5 py-1.5 rounded-full font-extrabold transition-colors">
              {isEnglish ? "Book Now" : "Reservar"}
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[72vh] bg-[#fbfbfd] overflow-hidden flex flex-col justify-center pt-12 pb-20">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        >
          <Image 
            src="/cabalgatas-en-medellin-y-caldas.webp" 
            alt={pagina.h1} 
            fill 
            priority={true}
            fetchPriority="high"
            quality={65} 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px" 
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-300 mb-6">
            <Link href={isEnglish ? "/en" : "/"} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Home className="w-4 h-4" /> {isEnglish ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
            <span className="text-amber-400 truncate">{pagina.enlaceCorto}</span>
          </nav>

          <span className="inline-block bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            {pagina.badge}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter drop-shadow-xl">
            {pagina.h1}
          </h1>

          <p className="text-zinc-100 text-lg md:text-xl font-medium mb-8 tracking-wide drop-shadow-md max-w-2xl leading-relaxed">
            {pagina.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <a 
              href={linkWhatsApp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-5 h-5"/> 
              {isEnglish ? "Book via WhatsApp" : "Reservar por WhatsApp"}
            </a>
            <Link 
              href={isEnglish ? "/en#cotizador" : "/#cotizador"} 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 text-amber-600" /> {isEnglish ? "Online Price Calculator" : "Ir al Cotizador en Línea"}
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-12">
        
        <article className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-12 border border-zinc-100">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-zinc-800 text-sm">
                {isEnglish ? "Verified Ranch Operator in Caldas, Antioquia" : "Operador Verificado en Caldas, Antioquia"}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-900 font-extrabold px-4 py-2 rounded-xl text-sm">
              {isEnglish ? "Rate:" : "Tarifa:"} {pagina.precioTexto}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-6 tracking-tight">
            {pagina.introH2}
          </h2>

          <div className="space-y-4 text-zinc-600 text-base md:text-lg leading-relaxed mb-10">
            {pagina.parrafos.map((parrafo, idx) => (
              <p key={idx}>{parrafo}</p>
            ))}
          </div>

          <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 border border-zinc-200/60 mb-10">
            <h3 className="text-xl font-extrabold text-zinc-900 mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" /> {isEnglish ? "What Is Included in This Experience?" : "¿Qué incluye esta experiencia?"}
            </h3>
            <ul className="space-y-3.5">
              {pagina.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-700 font-medium">
                  <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-extrabold text-zinc-900 mb-4 tracking-tight">
            {pagina.detallesH2}
          </h2>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
            {pagina.detallesTexto}
          </p>

          {/* TABLA COMPARATIVA PERSONALIZADA POR INTENCIÓN DE BÚSQUEDA */}
          <h3 className="text-lg font-extrabold text-zinc-900 mb-3">
            {pagina.tablaTitulo}
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 mb-8">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-4 font-bold">{isEnglish ? "Feature" : "Criterio"}</th>
                  <th className="p-4 font-bold text-amber-400">{pagina.tablaColNosotros}</th>
                  <th className="p-4 font-bold text-zinc-300">{pagina.tablaColOtros}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                {pagina.tablaFilas.map((fila, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-bold text-zinc-800">{fila.criterio}</td>
                    <td className="p-4 text-green-700 font-bold">{fila.nosotros}</td>
                    <td className="p-4 text-zinc-600 font-medium">{fila.otros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold mb-2">
                {isEnglish ? "Ready to book your date?" : "¿Listo para agendar tu fecha?"}
              </h3>
              <p className="text-zinc-300 text-sm">
                {isEnglish 
                  ? "Book in less than 2 minutes directly with our team in Caldas, Antioquia." 
                  : "Reserva en menos de 2 minutos directamente con nuestro equipo en Caldas, Antioquia."}
              </p>
            </div>
            <a 
              href={linkWhatsApp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-5 h-5"/> 
              {isEnglish ? "Confirm Spot Now" : "Confirmar Cupo Ahora"}
            </a>
          </div>
        </article>

        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-8 tracking-tight">
            {isEnglish ? `Frequently Asked Questions: ${pagina.enlaceCorto}` : `Preguntas Frecuentes: ${pagina.enlaceCorto}`}
          </h2>
          <div className="space-y-4">
            {pagina.faqs.map((faq, index) => (
              <details key={index} open className="group bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                <summary className="flex justify-between items-center font-bold p-5 text-zinc-900 cursor-pointer">
                  {faq.q}
                </summary>
                <div className="text-zinc-600 px-5 pb-5 pt-2 border-t border-zinc-200/60 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-600" /> {isEnglish ? "Explore More Routes & Packages in Medellin" : "Explora Más Rutas y Planes en Medellín"}
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            {isEnglish 
              ? "Choose the experience that best fits your group, celebration, or adventure style:" 
              : "Selecciona el plan que mejor se adapte a tu grupo, celebración o preferencia de aventura:"}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <Link 
              href={isEnglish ? "/en" : "/"} 
              className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/30 transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-sm text-zinc-800 group-hover:text-amber-700">
                {isEnglish ? "Main Page & Price Calculator" : "Portada Principal y Cotizador"}
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600" />
            </Link>
            <Link 
              href="/cabalgatas-caldas" 
              className="p-4 rounded-2xl border border-amber-300 bg-amber-50/40 hover:border-amber-500 transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-sm text-amber-900">
                {isEnglish ? "Caldas Ranch Guide (Vereda Salinas)" : "Cabalgatas Caldas, Antioquia (Guía Oficial)"}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link 
              href="/blog" 
              className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/30 transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-sm text-zinc-800 group-hover:text-amber-700">
                {isEnglish ? "Horseback Riding Blog & Tips" : "Guías y Blog de Cabalgatas"}
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600" />
            </Link>
            {PAGINAS_SEO.filter((p) => p.slug !== pagina.slug).map((otraPagina) => (
              <Link 
                key={otraPagina.slug} 
                href={`/${otraPagina.slug}`}
                className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/30 transition-colors flex items-center justify-between group"
              >
                <span className="font-bold text-sm text-zinc-800 group-hover:text-amber-700">{otraPagina.enlaceCorto}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER COMPLETO CON NAP TRADUCIDO SEGÚN IDIOMA DE LA URL */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 mt-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-left mb-10">
          <div>
            <h3 className="text-white text-xl font-extrabold mb-3 tracking-tight">
              {isEnglish ? "Medellin Horseback Riding" : "Cabalgata Medellín"}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {isEnglish 
                ? "Ecological horseback riding trails and off-road ATV tours in Vereda Salinas, Caldas (30 mins south of El Poblado, zero tolls). Full medical insurance with Magenta Seguros included." 
                : "Rutas ecológicas a caballo y tours en cuatrimoto en la Vereda Salinas, Caldas (a 30 min de El Poblado, sin peajes). Póliza de asistencia médica con Magenta Seguros incluida."}
            </p>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-3">
              {isEnglish ? "Location & Contact (NAP)" : "Contacto y Ubicación (NAP)"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><strong className="text-zinc-200">{isEnglish ? "Location:" : "Dirección:"}</strong> Vereda Salinas, Caldas, Antioquia, CO</li>
              <li><strong className="text-zinc-200">WhatsApp:</strong> +{whatsappNum}</li>
              <li><strong className="text-zinc-200">{isEnglish ? "Daily Departures:" : "Horarios:"}</strong> 10:00 AM, 2:00 PM & 4:00 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-3">
              {isEnglish ? "Main Links" : "Enlaces Directos"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href={isEnglish ? "/en" : "/"} className="hover:text-amber-400 transition-colors">{isEnglish ? "Home & Online Calculator" : "Portada y Cotizador"}</Link></li>
              <li><Link href="/cabalgatas-caldas" className="hover:text-amber-400 transition-colors">{isEnglish ? "Caldas Ranch Guide" : "Cabalgatas en Caldas, Antioquia"}</Link></li>
              <li><Link href="/planes-cabalgatas-medellin" className="hover:text-amber-400 transition-colors">{isEnglish ? "Packages & Pricing" : "Planes y Paquetes"}</Link></li>
              <li><Link href="/tour-cuatrimotos-medellin-caldas" className="hover:text-amber-400 transition-colors">{isEnglish ? "ATV Tours (1.5 Hours)" : "Tour de Cuatrimotos"}</Link></li>
              <li><Link href="/en-horseback-riding-medellin-tours" className="hover:text-amber-400 transition-colors">English Tour Guide 🇺🇸</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Cabalgata Medellín (cabalgatamedellin.com). {isEnglish ? "All rights reserved." : "Todos los derechos reservados."}</p>
          <Link href={isEnglish ? "/en" : "/"} className="text-amber-400 hover:underline font-bold">
            {isEnglish ? "← Back to Home (cabalgatamedellin.com/en)" : "← Volver a cabalgatamedellin.com"}
          </Link>
        </div>
      </footer>
    </div>
  );
}
