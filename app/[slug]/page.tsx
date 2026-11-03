import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, ShieldCheck, Star, Clock, MapPin, BadgeCheck, 
  CheckCircle2, Shield, Compass, ArrowRight, Home, ChevronRight 
} from 'lucide-react';

const URL_SITIO = 'https://cabalgatamedellin.com';
const WHATSAPP_DEFAULT = '573000000000';

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
  faqs: { q: string; a: string }[];
}

export const PAGINAS_SEO: PaginaSEO[] = [
  {
    slug: 'planes-cabalgatas-medellin',
    enlaceCorto: 'Planes y Precios de Cabalgatas',
    metaTitle: 'Planes de Cabalgatas en Medellín y Precios 2026 | Desde $100.000',
    metaDescription: 'Conoce nuestros planes de cabalgatas en Medellín y Caldas: Cabalgata Grupal ($100.000), Privada Exclusiva, Plan Celebración con almuerzo y Aventura VIP con transporte.',
    badge: '🐎 Planes desde $100.000 COP por persona',
    h1: 'Planes y Precios de Cabalgatas en Medellín y Caldas, Antioquia',
    subtitle: 'Elige entre cabalgatas grupales de fin de semana, recorridos 100% privados a tu propio ritmo o planes todo incluido con almuerzo, decoración y transporte.',
    precioTexto: 'Desde $100.000 COP / persona',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero cotizar uno de los planes de cabalgatas en Medellín y Caldas. 🐎',
    introH2: '¿Qué incluyen nuestros planes de cabalgatas cerca de Medellín?',
    parrafos: [
      'En Cabalgata Medellín hemos diseñado 4 modalidades pensadas para cada tipo de viajero, pareja, familia o grupo de amigos. A diferencia de los recorridos masivos, operamos en la Vereda Salinas de Caldas, Antioquia, a solo 30 minutos de El Poblado y Laureles sin pagar peajes.',
      'Nuestro Plan Grupal ($100.000 COP por persona) está disponible los sábados y domingos a las 2:00 PM sin cobro adicional de guía. Si prefieres exclusividad total y elegir tu propio horario (10:00 AM, 2:00 PM o 4:00 PM cualquier día de la semana), el Plan Privado asigna un guía exclusivo para tu grupo por una tarifa única de $80.000 COP.',
      'También contamos con el Plan Celebración (que suma almuerzo típico o especial por $30.000 COP y decoración para cumpleaños o aniversarios) y el Plan Aventura VIP con transporte privado ida y vuelta desde tu hotel o residencia en el Área Metropolitana.'
    ],
    incluye: [
      'Caballo criollo manso asignado según tu nivel de experiencia (2 horas de recorrido).',
      'Inducción práctica de manejo y seguridad antes de salir a la montaña.',
      'Póliza de asistencia médica total con Magenta Seguros para cada jinete.',
      'Acompañamiento de guía montado experto conocedor de los senderos ecológicos.',
      'Paradas en miradores naturales del Sur del Valle de Aburrá para fotografías.'
    ],
    detallesH2: 'Transparencia total en tarifas y bienestar animal',
    detallesTexto: 'No tenemos costos ocultos. Nuestros caballos descansan entre recorridos, reciben atención veterinaria permanente y manejamos un límite estricto de 110 kg por jinete para garantizar su bienestar.',
    faqs: [
      {
        q: '¿Cuál es la diferencia entre el Plan Grupal y el Plan Privado?',
        a: 'El Plan Grupal se realiza únicamente sábados y domingos a las 2:00 PM y no tiene costo extra de guía ($100.000 por persona). El Plan Privado se puede reservar cualquier día a las 10:00 AM, 2:00 PM o 4:00 PM exclusivamente para ti y tus acompañantes, sumando un único pago de $80.000 por el guía privado del grupo.'
      },
      {
        q: '¿Con cuánta anticipación debo reservar mi plan?',
        a: 'Para fines de semana y festivos recomendamos reservar con al menos 24 a 48 horas de anticipación debido a que manejamos cupos limitados por bienestar animal. Entre semana puedes reservar incluso el mismo día sujeto a disponibilidad.'
      },
      {
        q: '¿Qué métodos de pago aceptan para confirmar la reserva?',
        a: 'Puedes reservar fácilmente por WhatsApp realizando un abono por transferencia bancaria (Bancolombia, Nequi) o pago acordado con nuestro asesor, y pagar el saldo restante al llegar a la finca.'
      }
    ]
  },
  {
    slug: 'tour-cuatrimotos-medellin-caldas',
    enlaceCorto: 'Tour de Cuatrimotos en Medellín',
    metaTitle: 'Tour de Cuatrimotos en Medellín y Caldas | 1.5 Horas de Adrenalina',
    metaDescription: 'Vive el mejor tour de cuatrimotos cerca de Medellín en Caldas, Antioquia (a 30 min de El Poblado). 1.5 horas por trochas de montaña desde $250.000 COP.',
    badge: '🏍️ Ruta Off-Road de 1.5 Horas en Montaña',
    h1: 'Tour de Cuatrimotos en Medellín y Caldas, Antioquia: Aventura Off-Road',
    subtitle: 'Domina trochas reales de montaña, barro, bosques nativos y miradores panorámicos a solo 30 minutos del sur de Medellín.',
    precioTexto: '$250.000 COP / cuatrimoto (+ $50.000 parrillero)',
    precioNumero: '250000',
    whatsappMsg: '¡Hola! Quiero reservar el Tour de Cuatrimotos en Caldas, Antioquia. 🏍️',
    introH2: 'Adrenalina pura en cuatrimotos a 30 minutos de El Poblado',
    parrafos: [
      'Si buscas un plan extremo cerca de la ciudad sin perder horas en el tráfico hacia el Oriente antioqueño, nuestro Tour de Cuatrimotos en la Vereda Salinas (Caldas, Antioquia) te ofrece terrenos off-road auténticos a tan solo 30 minutos de El Poblado, Envigado, Sabaneta y Laureles.',
      'Durante 1.5 horas conducirás cuatrimotos automáticas de alto torque por senderos veredales, ascensos de montaña, pasos de agua y miradores naturales del Sur del Valle de Aburrá. Puedes ir solo en tu cuatrimoto por $250.000 COP o llevar un acompañante (copiloto/parrillero) por solo $50.000 COP adicionales.',
      'Además, somos el único operador en el sur del Valle de Aburrá donde puedes combinar en un mismo día un tour de cuatrimotos con una cabalgata ecológica para grupos mixtos.'
    ],
    incluye: [
      'Alquiler de cuatrimoto automática de alto cilindraje por 1.5 horas de ruta guiada.',
      'Casco certificado de seguridad e inducción práctica de conducción desde cero.',
      'Guía líder en ruta para asistirte en pasos técnicos y tomar fotos y videos.',
      'Póliza de asistencia médica con Magenta Seguros incluida.',
      'Opción de agregar parrillero/acompañante por solo $50.000 COP adicionales.'
    ],
    detallesH2: 'Requisitos para el Tour en Cuatrimoto',
    detallesTexto: 'No necesitas pase de moto ni experiencia previa en cuatrimotos automáticas, ya que hacemos una prueba práctica antes de salir. Es obligatorio usar calzado cerrado y ropa cómoda que puedas ensuciar.',
    faqs: [
      {
        q: '¿Es difícil manejar las cuatrimotos si soy principiante?',
        a: 'No. Nuestras cuatrimotos son automáticas (acelerador y freno, sin cambios manuales). Antes de iniciar la ruta en la montaña realizamos una inducción práctica para que te sientas 100% seguro.'
      },
      {
        q: '¿Pueden ir dos personas en una misma cuatrimoto?',
        a: 'Sí, nuestras máquinas tienen fuerza suficiente para dos adultos. El valor para el conductor es de $250.000 COP y el copiloto adicional tiene un costo de $50.000 COP ($300.000 COP en total por la pareja).'
      },
      {
        q: '¿Podemos combinar cuatrimotos y cabalgata en el mismo grupo?',
        a: '¡Por supuesto! Si en tu grupo algunos prefieren montar a caballo y otros quieren adrenalina en cuatrimoto, pueden agendar ambas experiencias en nuestra sede de Caldas.'
      }
    ]
  },
  {
    slug: 'cabalgatas-caldas-antioquia',
    enlaceCorto: 'Cabalgatas en Caldas, Antioquia',
    metaTitle: 'Cabalgatas en Caldas, Antioquia | Vereda Salinas (A 30 min de Medellín)',
    metaDescription: 'Disfruta de las mejores cabalgatas en Caldas, Antioquia (Vereda Salinas). Senderos ecológicos reales, caballos bien cuidados y seguro médico a 30 min de Medellín.',
    badge: '📍 Vereda Salinas, Caldas — Sur del Valle de Aburrá',
    h1: 'Cabalgatas en Caldas, Antioquia: Naturaleza Pura en la Vereda Salinas',
    subtitle: 'Descubre el secreto mejor guardado del Sur del Valle de Aburrá: montañas verdes, aire puro, tradición cafetera y senderos sin pavimento a minutos de Medellín.',
    precioTexto: 'Desde $100.000 COP / persona',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero información sobre las cabalgatas en la Vereda Salinas de Caldas. 🐎',
    introH2: '¿Por qué Caldas, Antioquia es el mejor destino para cabalgar cerca de Medellín?',
    parrafos: [
      'El municipio de Caldas, ubicado en el extremo sur del Valle de Aburrá, conserva la topografía montañosa, los nacimientos de agua y los caminos reales de herradura tradicionales de Antioquia. En nuestra sede de la Vereda Salinas cabalgas por tierra, bosque nativo y senderos ecológicos reales, lejos del ruido vehicular.',
      'Para quienes viven o se hospedan en Medellín, Envigado, Sabaneta, Itagüí o La Estrella, llegar a Caldas toma apenas 30 minutos por la Autopista Sur, ahorrando el pago de peajes costosos y evitando los trancones de fin de semana hacia Rionegro o Santa Elena.',
      'Al finalizar tu recorrido de 2 horas a caballo, puedes disfrutar del ambiente campestre de nuestra finca, tomar un café tradicional o almorzar en familia.'
    ],
    incluye: [
      'Recorrido guiado de 2 horas por los senderos de la Vereda Salinas en Caldas.',
      'Bienvenida con tinto campesino e inducción de manejo equino.',
      'Caballos dóciles en excelente estado nutricional y sanitario.',
      'Cobertura médica integral con Magenta Seguros.',
      'Parqueadero en la finca y fácil acceso en carro particular, Uber o taxi.'
    ],
    detallesH2: 'Cómo llegar a nuestra pesebrera en la Vereda Salinas, Caldas',
    detallesTexto: 'Una vez confirmas tu reserva por WhatsApp, te enviamos el pin exacto de Google Maps y Waze. Puedes llegar en cualquier vehículo particular, moto, taxi o contratando nuestro transporte VIP.',
    faqs: [
      {
        q: '¿Hay que pagar peajes desde Medellín hasta la finca en Caldas?',
        a: 'No. A diferencia de las cabalgatas en el Oriente antioqueño (Guarne, Rionegro o El Retiro), para llegar a Caldas desde Medellín, El Poblado o Laureles no pagas un solo peaje.'
      },
      {
        q: '¿El camino hasta la finca sirve para automóviles bajos?',
        a: 'Sí, la vía hasta nuestro punto de encuentro en Caldas permite el ingreso de automóviles particulares, taxis y camionetas sin inconvenientes.'
      },
      {
        q: '¿En qué horarios salen las cabalgatas en Caldas?',
        a: 'Tenemos salidas todos los días a las 10:00 AM, 2:00 PM y 4:00 PM en modalidad privada, y sábados y domingos a las 2:00 PM en modalidad grupal.'
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
    precioTexto: 'Plan Privado Pareja + Almuerzo ($30.000) y Decoración',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero cotizar una Cabalgata Romántica para pareja (Aniversario / Celebración). ❤️🐎',
    introH2: 'El plan romántico más original a 30 minutos de El Poblado',
    parrafos: [
      'Si estás cansado de los mismos restaurantes en Provenza o El Poblado para celebrar un aniversario, cumpleaños o pedir matrimonio, una cabalgata privada al aire libre por los miradores de Caldas es una experiencia que tu pareja jamás olvidará.',
      'En nuestro Plan Celebración para parejas, ustedes dos cabalgan de forma 100% exclusiva (sin desconocidos en el grupo). Nuestro guía los acompaña a una distancia prudente para garantizar su seguridad, guiarlos por los paisajes más bonitos del bosque y tomarles fotografías y videos increíbles juntos.',
      'Al regresar del recorrido de 2 horas, los espera una mesa reservada con decoración especial ($50.000 COP, o gratis para grupos de más de 6 personas) y almuerzo ($30.000 COP por persona).'
    ],
    incluye: [
      'Recorrido 100% privado para la pareja en el horario que elijas (10 AM, 2 PM o 4 PM).',
      'Guía exclusivo que actúa como fotógrafo de la pareja en los miradores.',
      'Opción de almuerzo especial ($30.000 COP/persona) al finalizar la ruta.',
      'Opción de mesa decorada con globos/detalles para cumpleaños o aniversario ($50.000 COP).',
      'Seguro médico Magenta Seguros para ambos jinetes.'
    ],
    detallesH2: 'Mejor horario para una cabalgata en pareja',
    detallesTexto: 'Te recomendamos el turno de las 4:00 PM si deseas disfrutar la luz dorada del atardecer en las montañas de Antioquia, o el turno de las 10:00 AM para cerrar con un almuerzo campestre.',
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
      'Sabemos que cuando buscas una cabalgata familiar en Medellín, tu prioridad número uno es la tranquilidad y seguridad de tus hijos. En Cabalgata Medellín no alquilamos caballos brioso ni de fiesta: nuestra manada está entrenada específicamente para el turismo ecológico y familiar.',
      'Recibimos niños a partir de los 3 años de edad (acompañados por un adulto). Antes de iniciar la ruta, nuestros guías evalúan la edad y confianza de cada niño e integrante de la familia para asignarle el caballo perfecto por mansedumbre y tamaño.',
      'Además, todas nuestras salidas cuentan con cobertura de asistencia médica a través de Magenta Seguros, y en los planes grupales de más de 6 personas con almuerzo te obsequiamos la decoración si están celebrando un cumpleaños familiar.'
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
    enlaceCorto: 'Alquiler de Caballos en Medellín',
    metaTitle: 'Alquiler de Caballos en Medellín por Horas | Precios 2026 ($100.000)',
    metaDescription: '¿Buscas alquiler de caballos en Medellín? Paseos guiados de 2 horas por senderos ecológicos desde $100.000 COP con seguro médico incluido. ¡Reserva hoy!',
    badge: '💰 Mejor Relación Calidad-Precio en Antioquia',
    h1: 'Alquiler de Caballos en Medellín: Precios, Horarios y Rutas Guiadas',
    subtitle: 'Alquila caballos criollos dóciles y bien cuidados para paseos ecológicos de 2 horas en la montaña, siempre acompañados por guías profesionales y póliza de seguro.',
    precioTexto: '$100.000 COP por caballo (Ruta de 2 horas)',
    precioNumero: '100000',
    whatsappMsg: '¡Hola! Quiero consultar disponibilidad para alquiler de caballos en Medellín. 🐎',
    introH2: '¿Cuánto vale alquilar un caballo en Medellín en 2026?',
    parrafos: [
      'El valor del alquiler de caballos en Medellín con ruta ecológica completa de 2 horas es de $100.000 COP por persona. A diferencia de los potreros cerrados donde das vueltas en círculo por 20 minutos, con nosotros sales a una verdadera travesía de montaña por la Vereda Salinas en Caldas.',
      'Por seguridad de los jinetes y bienestar de nuestros ejemplares, el alquiler siempre incluye el aperaje completo (silla cómoda, freno y estribos ajustados a tu estatura), inducción previa, acompañamiento de guía y seguro médico de accidentes con Magenta Seguros.',
      'Si reservas para el sábado o domingo a las 2:00 PM en grupo compartido, solo pagas los $100.000 COP por caballo. Si deseas alquilar los caballos en horario privado para ti y tus amigos cualquier día de la semana, solo se adiciona $80.000 COP por el guía privado.'
    ],
    incluye: [
      'Alquiler de caballo ensillado durante 2 horas efectivas de ruta ecológica.',
      'Ajuste personalizado de estribos y asignación de ejemplar según peso (máx. 110 kg) y experiencia.',
      'Póliza médica activa durante toda la actividad con Magenta Seguros.',
      'Guía baquiano acompañante durante todo el trayecto.',
      'Hidratación de bienvenida (tinto tradicional) en la pesebrera.'
    ],
    detallesH2: 'Por qué elegir un operador formal de alquiler equino',
    detallesTexto: 'Alquilar caballos informales en carretera sin seguro médico ni guías capacitados es un riesgo innecesario. En Cabalgata Medellín garantizamos caballos sanos, herrados correctamente y respaldo legal.',
    faqs: [
      {
        q: '¿Alquilan caballos sin guía para salir solos?',
        a: 'Por normatividad de seguridad turística y para activar la cobertura de la póliza de Magenta Seguros, todos los recorridos van acompañados por nuestro guía experto, quien se adapta al ritmo que ustedes deseen llevar.'
      },
      {
        q: '¿Cuál es el peso máximo permitido para alquilar un caballo?',
        a: 'Por respeto y cuidado de la columna de nuestros caballos criollos, el peso máximo permitido por jinete es de 110 kilogramos.'
      },
      {
        q: '¿Tienen descuento para grupos grandes?',
        a: 'En grupos privados el costo del guía ($80.000 COP) se divide entre todos los integrantes, y para grupos de más de 6 personas que tomen el Plan Celebración, la decoración festiva es totalmente gratis.'
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
  }
];

export const dynamicParams = false;

export async function generateStaticParams() {
  return PAGINAS_SEO.map((pagina) => ({
    slug: pagina.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const pagina = PAGINAS_SEO.find((p) => p.slug === resolvedParams.slug);

  if (!pagina) {
    return { title: 'Página no encontrada | Cabalgata Medellín' };
  }

  const urlCompleta = `${URL_SITIO}/${pagina.slug}`;

  return {
    title: pagina.metaTitle,
    description: pagina.metaDescription,
    alternates: {
      canonical: urlCompleta,
    },
    openGraph: {
      title: pagina.metaTitle,
      description: pagina.metaDescription,
      url: urlCompleta,
      siteName: 'Cabalgata Medellín',
      locale: pagina.slug.startsWith('en-') ? 'en_US' : 'es_CO',
      type: 'website',
    },
  };
}

export default async function SEOLandingPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const pagina = PAGINAS_SEO.find((p) => p.slug === resolvedParams.slug);

  if (!pagina) {
    notFound();
  }

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
            "name": "Cabalgatas en Medellín",
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
          "name": "Cabalgata Medellín"
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
    <div className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />

      {/* HERO DE LA LANDING SEO */}
      <section className="relative min-h-[75vh] bg-[#fbfbfd] overflow-hidden flex flex-col justify-center pt-16 pb-20">
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
            quality={75} 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 768px) 768px, 1200px" 
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6">
          {/* MIGAS DE PAN (BREADCRUMBS PARA INTERLINKING) */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-300 mb-6">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Home className="w-4 h-4" /> Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
            <span className="text-amber-400 truncate">{pagina.enlaceCorto}</span>
          </nav>

          <span className="inline-block bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4">
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
              rel="noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-5 h-5"/> 
              Reservar por WhatsApp
            </a>
            <Link 
              href="/#cotizador" 
              className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-zinc-900 font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 text-amber-600" /> Ir al Cotizador en Línea
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENIDO PROFUNDO SEO */}
      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-12">
        
        <article className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-12 border border-white">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-zinc-800 text-sm">Operador Verificado en Caldas, Antioquia</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-900 font-extrabold px-4 py-2 rounded-xl text-sm">
              Tarifa: {pagina.precioTexto}
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
              <CheckCircle2 className="w-6 h-6 text-green-600" /> ¿Qué incluye esta experiencia?
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

          {/* TABLA COMPARATIVA SEO LOCAL */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 mb-8">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-4 font-bold">Criterio</th>
                  <th className="p-4 font-bold text-amber-400">Cabalgata Medellín (Caldas - Sur)</th>
                  <th className="p-4 font-bold text-zinc-400">Otros (Oriente Antioqueño)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Tiempo desde El Poblado</td>
                  <td className="p-4 text-green-700 font-bold">30 minutos (Sin peajes)</td>
                  <td className="p-4 text-zinc-500">60 a 90 minutos (+ Peajes)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Precio Base (2 Horas)</td>
                  <td className="p-4 text-green-700 font-bold">$100.000 COP</td>
                  <td className="p-4 text-zinc-500">$120.000 - $160.000 COP</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Póliza Médica</td>
                  <td className="p-4 text-green-700 font-bold">Incluida (Magenta Seguros)</td>
                  <td className="p-4 text-zinc-500">No siempre incluida</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Edad Mínima / Peso Máx.</td>
                  <td className="p-4 text-zinc-700 font-semibold">Desde 3 años / Hasta 110 kg</td>
                  <td className="p-4 text-zinc-500">Variable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold mb-2">¿Listo para agendar tu fecha?</h3>
              <p className="text-zinc-300 text-sm">Reserva en menos de 2 minutos directamente con nuestro equipo en Caldas, Antioquia.</p>
            </div>
            <a 
              href={linkWhatsApp} 
              target="_blank" 
              rel="noreferrer" 
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-5 h-5"/> 
              Confirmar Cupo Ahora
            </a>
          </div>
        </article>

        {/* PREGUNTAS FRECUENTES ESPECÍFICAS DE LA LANDING */}
        <section className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-white">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-8 tracking-tight">
            Preguntas Frecuentes: {pagina.enlaceCorto}
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

        {/* CLUSTER DE INTERLINKING (ENLACES INTERNOS ENTRE LAS 10 PÁGINAS) */}
        <section className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-white">
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-600" /> Explora Más Rutas y Planes en Medellín
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Selecciona el plan que mejor se adapte a tu grupo, celebración o preferencia de aventura:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <Link 
              href="/" 
              className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/30 transition-all flex items-center justify-between group"
            >
              <span className="font-bold text-sm text-zinc-800 group-hover:text-amber-700">Portada Principal y Cotizador</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600" />
            </Link>
            {PAGINAS_SEO.filter((p) => p.slug !== pagina.slug).map((otraPagina) => (
              <Link 
                key={otraPagina.slug} 
                href={`/${otraPagina.slug}`}
                className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:bg-amber-50/30 transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-sm text-zinc-800 group-hover:text-amber-700">{otraPagina.enlaceCorto}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER CON NAP COMPLETO */}
      <footer className="bg-zinc-950 text-zinc-400 py-14 mt-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-extrabold text-lg">Cabalgata Medellín — Vereda Salinas, Caldas, Antioquia</p>
            <p className="text-xs text-zinc-500 mt-1">A 30 minutos de El Poblado y Laureles (Sin peajes) • Póliza Magenta Seguros Incluida</p>
          </div>
          <Link href="/" className="text-amber-400 hover:underline text-sm font-bold">
            ← Volver a cabalgatamedellin.com
          </Link>
        </div>
      </footer>
    </div>
  );
}