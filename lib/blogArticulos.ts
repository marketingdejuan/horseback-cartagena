export interface ArticuloBlogSEO {
  slug: string;
  title: string;
  metaDesc: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  intro: string;
  secciones: {
    h2: string;
    parrafos: string[];
    bullets?: string[];
  }[];
  conclusion: string;
  ctaTexto: string;
  ctaLink: string;
  enlacesRelacionados: { texto: string; href: string }[];
}

export const ARTICULOS_BLOG_SEO: ArticuloBlogSEO[] = [
  {
    slug: 'primera-cabalgata',
    title: 'Guía Completa para tu Primera Cabalgata en Medellín: Consejos para Principiantes',
    metaDesc: '¿Vas a montar a caballo por primera vez en Medellín? Conoce cómo perder el miedo, cómo sujetar las riendas, qué ropa llevar y por qué nuestros caballos en Caldas son 100% seguros.',
    date: '2026-10-24',
    category: 'Principiantes y Seguridad',
    readTime: '4 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Hacer tu primera cabalgata en Medellín es una de las experiencias más emocionantes y relajantes que puedes vivir en las montañas de Antioquia. Si nunca te has subido a un caballo, es completamente normal sentir curiosidad o un poco de nervios al principio.',
    secciones: [
      {
        h2: '1. La elección del caballo: el secreto de una primera vez sin miedo',
        parrafos: [
          'El éxito de tu primera cabalgata depende en un 90% de la nobleza del caballo. En nuestra pesebrera de la Vereda Salinas en Caldas (a solo 30 minutos de El Poblado), asignamos a los principiantes caballos criollos experimentados, dóciles y acostumbrados a caminar a un paso suave por senderos ecológicos.',
          'Antes de salir de la finca, nuestros guías ajustan los estribos a la medida exacta de tus piernas y te dan una inducción práctica de 10 minutos para que aprendas a avanzar, girar suavemente y detenerte con total confianza.'
        ]
      },
      {
        h2: '2. Postura básica y conexión con tu caballo',
        parrafos: [
          'Los caballos son animales sumamente perceptivos que sienten la energía del jinete. Mantener una postura relajada hará que tu caballo camine tranquilo durante las 2 horas del recorrido:'
        ],
        bullets: [
          'Espalda recta pero relajada: acompaña el movimiento natural del caballo con tu cadera sin ponerte rígido.',
          'Talones ligeramente hacia abajo: esto te da equilibrio natural sobre los estribos en subidas y bajadas.',
          'Manos suaves en las riendas: no necesitas halar con fuerza; una leve indicación hacia la izquierda, derecha o atrás es suficiente.',
          'Confía en el guía: en todo momento vas acompañado por nuestros baquianos expertos y cubierto por la póliza médica de Magenta Seguros.'
        ]
      }
    ],
    conclusion: 'No necesitas ser un experto para disfrutar de los bosques nativos y miradores del Sur del Valle de Aburrá. Más del 70% de nuestros visitantes en Caldas montan por primera vez y terminan enamorados de la experiencia.',
    ctaTexto: 'Reservar mi Primera Cabalgata Segura',
    ctaLink: '/cabalgatas-ninos-familias-medellin',
    enlacesRelacionados: [
      { texto: 'Ver Planes y Precios de Cabalgatas', href: '/planes-cabalgatas-medellin' },
      { texto: 'Cabalgatas Seguras para Niños y Familias', href: '/cabalgatas-ninos-familias-medellin' },
      { texto: '¿Qué Ropa Llevar a una Cabalgata?', href: '/blog/ropa-cabalgata' }
    ]
  },
  {
    slug: 'mansos-briosos',
    title: 'Caballos Mansos vs. Caballos Briosos: ¿Cuál es el Ideal para Turismo Ecológico?',
    metaDesc: 'Conoce la diferencia entre caballos mansos de senderismo y caballos briosos. Descubre cómo seleccionamos tu ejemplar ideal en Caldas, Antioquia según tu experiencia.',
    date: '2026-10-24',
    category: 'Bienestar Equino',
    readTime: '4 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'En la cultura equina de Antioquia existen dos temperamentos muy marcados: los caballos mansos de ruta ecológica y los caballos briosos de silla. Comprender su diferencia es clave para disfrutar de un paseo seguro por la montaña.',
    secciones: [
      {
        h2: '¿Por qué en el ecoturismo priorizamos caballos mansos y nobles?',
        parrafos: [
          'En una cabalgata ecológica por senderos de montaña, quebradas y miradores como los de la Vereda Salinas en Caldas, la prioridad absoluta es que puedas contemplar el paisaje, tomar fotografías y conversar con tu pareja o amigos sin estar luchando con el caballo.',
          'Nuestros caballos mansos tienen un paso firme, conocen cada piedra del sendero y no se asustan con facilidad, lo que los hace perfectos para niños desde los 3 años, familias, parejas y turistas extranjeros.'
        ],
        bullets: [
          'Caballo manso: obedece al instante, mantiene un ritmo constante en grupo y brinda seguridad total a principiantes.',
          'Caballo con más chispa (para jinetes con experiencia): si ya sabes montar y prefieres un ejemplar más activo en un recorrido privado, nuestros guías te asignarán el caballo ideal para tu nivel.',
          'Bienestar animal garantizado: todos nuestros ejemplares descansan entre turnos, tienen control veterinario y límite estricto de 110 kg por jinete.'
        ]
      }
    ],
    conclusion: 'Ya sea que busques tranquilidad total en tu primer paseo o que tengas experiencia montando, en Cabalgata Medellín hacemos un emparejamiento personalizado antes de iniciar la ruta.',
    ctaTexto: 'Cotizar Cabalgata a mi Medida',
    ctaLink: '/alquiler-caballos-medellin-precios',
    enlacesRelacionados: [
      { texto: 'Alquiler de Caballos en Medellín y Precios', href: '/alquiler-caballos-medellin-precios' },
      { texto: 'Cabalgatas en Caldas, Antioquia', href: '/cabalgatas-caldas-antioquia' },
      { texto: 'El Lenguaje Secreto de los Caballos', href: '/blog/el-lenguaje-secreto-de-los-caballos-como-se-comunican-entre-ellos-y-con-nosotros' }
    ]
  },
  {
    slug: 'ropa-cabalgata',
    title: '¿Qué Ropa Llevar a una Cabalgata en Medellín? Lista Práctica para la Montaña',
    metaDesc: 'Descubre cómo vestirte para una cabalgata en Medellín y Caldas: calzado recomendado, tipo de pantalón, protección solar y accesorios tradicionales paisas.',
    date: '2026-10-23',
    category: 'Recomendaciones',
    readTime: '3 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Elegir la ropa adecuada para montar a caballo en el clima templado de montaña de Caldas, Antioquia (entre 18°C y 24°C) marca la diferencia entre un paseo sumamente cómodo y sufrir roces innecesarios.',
    secciones: [
      {
        h2: 'Las 4 prendas imprescindibles para montar a caballo con comodidad',
        parrafos: [
          'Durante las 2 horas de recorrido por senderos ecológicos estarás en contacto directo con la silla de montar y los estribos. Por eso, el código de vestuario básico prioriza la protección de tus piernas y pies:'
        ],
        bullets: [
          '1. Pantalón largo obligatorio: usa jean con algo de elasticidad, sudadera gruesa o leggings deportivos resistentes. Evita pantalonetas, shorts o faldas, ya que el cuero de la silla puede rozar la piel.',
          '2. Calzado cerrado con buen agarre: botas de trekking, botines o tenis deportivos cerrados. Nunca uses sandalias, chanclas ni tacones.',
          '3. Camiseta fresca y chaqueta ligera: en las montañas del sur del Valle de Aburrá la brisa es fresca, especialmente en el turno de las 4:00 PM.',
          '4. Protección para el sol: bloqueador solar, gafas de sol y gorra o sombrero.'
        ]
      },
      {
        h2: '¿Y si llueve o quiero lucir el estilo tradicional antioqueño?',
        parrafos: [
          'En caso de lluvia ligera durante el recorrido, nosotros te suministramos ponchos impermeables sin costo para que sigas disfrutando la aventura. Además, en nuestra finca puedes adquirir el tradicional Sombrero Paisa o el Poncho Antioqueño por $30.000 COP para llevarte el mejor recuerdo fotográfico.'
        ]
      }
    ],
    conclusion: 'Prepara tu pinta cómoda de montaña, trae tu celular con buena batería para las fotos en los miradores y déjanos el resto a nosotros.',
    ctaTexto: 'Ver Planes y Reservar Ahora',
    ctaLink: '/planes-cabalgatas-medellin',
    enlacesRelacionados: [
      { texto: 'Planes de Cabalgatas desde $100.000', href: '/planes-cabalgatas-medellin' },
      { texto: 'Guía para tu Primera Cabalgata', href: '/blog/primera-cabalgata' },
      { texto: 'Cabalgata VIP con Transporte desde El Poblado', href: '/cabalgata-vip-transporte-el-poblado-laureles' }
    ]
  },
  {
    slug: 'integracion-empresas-medellin-cabalgatas',
    title: 'Integración de Empresas en Medellín: Cabalgatas y Cuatrimotos para Equipos',
    metaDesc: 'Organiza la mejor salida empresarial o integración de equipos cerca de Medellín. Cabalgatas ecológicas, cuatrimotos, almuerzo campestre y seguro médico en Caldas.',
    date: '2026-10-23',
    category: 'Grupos y Empresas',
    readTime: '5 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Las empresas en Medellín están cambiando las clásicas reuniones en salones cerrados por experiencias al aire libre que fortalecen el trabajo en equipo, reducen el estrés laboral y premian el cumplimiento de metas.',
    secciones: [
      {
        h2: '¿Por qué hacer tu integración corporativa en Caldas, Antioquia?',
        parrafos: [
          'A solo 30 minutos del sur de Medellín (El Poblado, Envigado, Itagüí y Sabaneta) y sin pagar peajes, nuestra sede en la Vereda Salinas ofrece un entorno natural privado donde tu equipo puede desconectarse del computador y conectar con la naturaleza.',
          'Contamos con capacidad logística para grupos corporativos, combinando recorridos guiados a caballo de 2 horas, tours de adrenalina en cuatrimotos y almuerzos de integración.'
        ],
        bullets: [
          'Seguridad respaldada para RR.HH.: cada participante cuenta con póliza de asistencia médica individual de Magenta Seguros.',
          'Decoración GRATIS para grupos de 6+ personas: al reservar el Plan Celebración con almuerzo ($30.000 COP/persona), incluimos la decoración festiva sin costo.',
          'Actividades mixtas: quienes prefieran motores pueden tomar el Tour de Cuatrimotos ($250.000 COP) en la misma jornada.',
          'Facturación y soporte formal de operador turístico en Antioquia.'
        ]
      }
    ],
    conclusion: 'Regálale a tu equipo de trabajo una jornada de bienestar, montaña y camaradería a minutos de la oficina.',
    ctaTexto: 'Cotizar Evento para mi Empresa o Grupo',
    ctaLink: '/cabalgatas-grupos-empresas-medellin',
    enlacesRelacionados: [
      { texto: 'Cabalgatas para Grupos y Empresas en Medellín', href: '/cabalgatas-grupos-empresas-medellin' },
      { texto: 'Tour de Cuatrimotos en Medellín y Caldas', href: '/tour-cuatrimotos-medellin-caldas' },
      { texto: 'Cotizador en Línea de Grupos', href: '/#cotizador' }
    ]
  },
  {
    slug: 'mitos-y-verdades-sobre-montar-a-caballo',
    title: '5 Mitos y Verdades sobre Montar a Caballo que Debes Conocer Antes de Reservar',
    metaDesc: 'Desmentimos los mitos más comunes sobre las cabalgatas en Medellín: ¿se necesita fuerza física?, ¿daña a los caballos?, ¿es peligroso para niños? Descubre la verdad.',
    date: '2026-06-10',
    category: 'Cultura Equina',
    readTime: '4 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Alrededor del mundo ecuestre existen muchos mitos que a veces impiden que las personas vivan una de las experiencias más enriquecedoras de contacto con la naturaleza. Aquí aclaramos los 5 mitos más frecuentes.',
    secciones: [
      {
        h2: 'Mitos vs. Realidades del senderismo ecuestre responsable',
        parrafos: [
          'Cuando se practica bajo estándares de turismo ecológico como los que aplicamos en Caldas, Antioquia, montar a caballo es una actividad noble tanto para el humano como para el animal:'
        ],
        bullets: [
          'Mito 1: "Necesito mucha fuerza física para controlar al caballo". FALSO: el caballo se guía con equilibrio suave y técnica básica que te enseñamos en 10 minutos, no con fuerza bruta.',
          'Mito 2: "Todas las cabalgatas maltratan a los caballos". FALSO: en las cabalgatas ecológicas responsables (a diferencia de las ferias urbanas sobre pavimento con licor), los caballos caminan por tierra blanda de bosque, descansan entre recorridos y tienen límite de peso de 110 kg.',
          'Mito 3: "Los niños pequeños no pueden montar". FALSO: desde los 3 años de edad los niños pueden disfrutar del paseo acompañados por un adulto y en caballos completamente mansos.',
          'Mito 4: "Quedaré adolorido por una semana". FALSO: al ir a un paso ecológico suave con sillas acolchadas y estribos bien graduados, el cuerpo se adapta con total comodidad.'
        ]
      }
    ],
    conclusion: 'Vivir una cabalgata ecológica certificada cambia por completo tu percepción sobre estos nobles animales.',
    ctaTexto: 'Vivir la Experiencia Ecológica en Caldas',
    ctaLink: '/cabalgatas-caldas-antioquia',
    enlacesRelacionados: [
      { texto: 'Dónde Montar a Caballo Cerca de Medellín', href: '/donde-montar-a-caballo-cerca-de-medellin' },
      { texto: 'Cabalgatas en Caldas, Antioquia', href: '/cabalgatas-caldas-antioquia' },
      { texto: 'Caballos Mansos vs. Briosos', href: '/blog/mansos-briosos' }
    ]
  },
  {
    slug: 'tradicion-naturaleza-y-aventura-asi-se-vive-diciembre-en-cabalgata-1',
    title: 'Tradición, Naturaleza y Aventura: Así se Viven las Vacaciones y Festivos a Caballo en Medellín',
    metaDesc: '¿Buscas planes para diciembre, vacaciones o puentes festivos en Medellín? Vive la tradición antioqueña con una cabalgata ecológica familiar o en pareja en Caldas.',
    date: '2026-05-17',
    category: 'Planes en Medellín',
    readTime: '4 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Durante diciembre, las vacaciones de mitad de año y los puentes festivos, Medellín recibe a miles de viajeros y familias que buscan un plan auténtico para reencontrarse lejos de los centros comerciales congestionados.',
    secciones: [
      {
        h2: 'El plan perfecto para recibir a familiares del exterior o celebrar en grupo',
        parrafos: [
          'En Antioquia, salir a cabalgar por las montañas cafeteras del sur del Valle de Aburrá es sinónimo de celebración, aire puro y tradición paisa. En nuestra finca de la Vereda Salinas en Caldas hemos creado el ambiente ideal para que locales y turistas celebren sin preocupaciones.',
          'Puedes elegir entre un recorrido privado para toda tu familia, agregar un almuerzo tradicional antioqueño ($30.000 COP) o contratar nuestro transporte VIP puerta a puerta desde El Poblado y Laureles ($130.000 COP).'
        ],
        bullets: [
          'Salidas diarias en vacaciones y festivos: 10:00 AM, 2:00 PM y 4:00 PM.',
          'Atención bilingüe para familiares o amigos que visitan desde Estados Unidos o Europa.',
          'Decoración festiva gratuita en el Plan Celebración para grupos de más de 6 personas.',
          'Cero peajes y a solo 30 minutos del sur de Medellín.'
        ]
      }
    ],
    conclusion: 'En temporada alta los cupos de fin de semana se agotan rápido porque respetamos el descanso de nuestros caballos. Reserva tu fecha con anticipación por WhatsApp.',
    ctaTexto: 'Reservar Cupo para mi Familia o Grupo',
    ctaLink: '/planes-cabalgatas-medellin',
    enlacesRelacionados: [
      { texto: 'Plan Celebración y Cumpleaños', href: '/cabalgata-romantica-parejas-medellin' },
      { texto: 'Cabalgata VIP con Transporte Incluido', href: '/cabalgata-vip-transporte-el-poblado-laureles' },
      { texto: 'Private Horseback Riding Tours (English)', href: '/en-horseback-riding-medellin-tours' }
    ]
  },
  {
    slug: 'el-lenguaje-secreto-de-los-caballos-como-se-comunican-entre-ellos-y-con-nosotros',
    title: 'El Lenguaje Secreto de los Caballos: Cómo se Comunican con Nosotros en la Ruta',
    metaDesc: 'Aprende a leer las orejas, la postura y los gestos de tu caballo durante una cabalgata. Conecta de verdad con tu ejemplar en nuestras rutas ecológicas de Medellín.',
    date: '2026-07-08',
    category: 'Conexión Equina',
    readTime: '5 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Los caballos no hablan con palabras, pero tienen uno de los lenguajes corporales más expresivos y honestos del reino animal. Aprender a interpretar sus señales hará que tu próxima cabalgata en Caldas sea una verdadera experiencia de conexión.',
    secciones: [
      {
        h2: 'Qué te dicen las orejas, el cuello y la respiración de tu caballo',
        parrafos: [
          'Durante la etapa de "Conexión" previa a salir a los senderos de la Vereda Salinas, nuestros guías te presentan a tu caballo. Si observas con atención estos detalles, sabrás exactamente qué está sintiendo:'
        ],
        bullets: [
          'Orejas hacia adelante: tu caballo está atento, curioso y concentrado en el sendero frente a él.',
          'Orejas relajadas hacia los lados o girando hacia atrás: te está escuchando a ti y camina en total estado de relajación.',
          'Suspiro profundo o masticación suave: es la señal equina de máxima tranquilidad y confianza con su jinete.',
          'Contacto suave en el cuello: acariciarle la tabla del cuello al iniciar y finalizar el recorrido refuerza el vínculo de confianza.'
        ]
      }
    ],
    conclusion: 'Montar a caballo de forma consciente es una terapia natural que calma la mente y despierta los sentidos.',
    ctaTexto: 'Conectar con Nuestros Caballos en Caldas',
    ctaLink: '/cabalgatas-caldas-antioquia',
    enlacesRelacionados: [
      { texto: 'Caballos Mansos vs. Caballos Briosos', href: '/blog/mansos-briosos' },
      { texto: 'Cabalgatas para Niños y Principiantes', href: '/cabalgatas-ninos-familias-medellin' },
      { texto: 'Planes de Cabalgatas en Medellín', href: '/planes-cabalgatas-medellin' }
    ]
  },
  {
    slug: 'cabalgatas-una-actividad-perfecta-para-desconectarte-de-la-rutina',
    title: 'Cabalgatas Ecológicas: La Actividad Perfecta para Desconectarte de la Rutina en Medellín',
    metaDesc: 'Descubre los beneficios físicos y mentales de cambiar el ruido de la ciudad por 2 horas de cabalgata ecológica en los bosques de Caldas, Antioquia.',
    date: '2026-07-04',
    category: 'Bienestar y Naturaleza',
    readTime: '4 min de lectura',
    image: '/cabalgatas-en-medellin-y-caldas.webp',
    intro: 'Entre el tráfico urbano, las notificaciones del celular y el ritmo acelerado de la semana, nuestro cerebro necesita espacios reales de desconexión en la naturaleza (conocidos como "baños de bosque").',
    secciones: [
      {
        h2: '3 beneficios comprobados de cabalgar al aire libre cerca de Medellín',
        parrafos: [
          'A solo 30 minutos hacia el sur de Medellín, el paisaje urbano desaparece y da paso a las montañas verdes, quebradas cristalinas y bosques de niebla de Caldas, Antioquia:'
        ],
        bullets: [
          'Reducción inmediata del cortisol (estrés): el ritmo pausado del paso del caballo y el sonido del bosque bajan la frecuencia cardíaca desde los primeros 15 minutos.',
          'Ejercicio de bajo impacto: mantener el equilibrio sobre la silla activa suavemente la zona lumbar, el abdomen y la postura sin forzar las articulaciones.',
          'Tiempo de calidad real: ya sea en una cabalgata romántica en pareja o en un paseo con amigos y familia, son 2 horas de conversación y risas sin pantallas de por medio.'
        ]
      }
    ],
    conclusion: 'No tienes que esperar a unas largas vacaciones para recargar energías. Escápate este fin de semana o cualquier día entre semana a solo 30 minutos de El Poblado.',
    ctaTexto: 'Cotizar mi Escapada a Caballo Ahora',
    ctaLink: '/#cotizador',
    enlacesRelacionados: [
      { texto: 'Cabalgata Romántica para Parejas', href: '/cabalgata-romantica-parejas-medellin' },
      { texto: 'Dónde Montar a Caballo Cerca de Medellín', href: '/donde-montar-a-caballo-cerca-de-medellin' },
      { texto: 'Reservar Cabalgata en Línea', href: '/reservar' }
    ]
  }
];