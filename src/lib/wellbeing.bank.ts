import type { Deck } from './questions';
type Item = [string, string[], number, string];
const groups: Record<string, Item[]> = {
 stress: [
 ['Antes de una prueba se siente tenso. ¿Primer paso razonable?', ['Estudiar sin parar', 'Hacer una pausa breve y organizar un paso', 'Ocultar siempre lo que siente', 'Tomar medicación ajena'], 1, 'Reconozca la tensión, pause y elija una tarea pequeña. Si persiste o interfiere con su vida, solicite apoyo profesional.'],
 ['Tiene varias tareas. ¿Qué ayuda a organizarlas?', ['Hacerlas todas a la vez', 'Dejar de dormir', 'Priorizar y dividirlas en pasos', 'Evitar pedir ayuda'], 2, 'Anote tareas, elija una prioridad y divida su trabajo. Una meta pequeña permite avanzar sin exigir perfección.'],
 ['Un compañero expresa preocupación. ¿Cómo acompañarlo?', ['Burlarse', 'Diagnosticarlo', 'Exigirle que se calme', 'Escuchar sin juzgar'], 3, 'Escuche y pregunte qué apoyo necesita. No diagnostique ni prometa resolver todo.'],
 ['Una preocupación le impide funcionar durante varios días. ¿Qué conviene?', ['Buscar apoyo de confianza y profesional', 'Ignorarla indefinidamente', 'Automedicarse', 'Aislarse siempre'], 0, 'El juego no evalúa su salud. Una dificultad persistente merece apoyo de una persona de confianza y profesionales.'],
 ['¿Cuál es una meta de estudio manejable?', ['Aprender todo hoy', 'Repasar un concepto y descansar', 'No cometer ningún error', 'Compararse todo el tiempo'], 1, 'Elija un concepto, practíquelo y revise lo aprendido. Los errores permiten ajustar el siguiente paso.'],
 ],
 sleep: [
 ['¿Qué rutina favorece el descanso?', ['Cambiar horarios cada noche', 'Mantener horarios regulares', 'Estudiar en la cama toda la noche', 'Dormir solo cuando termine todo'], 1, 'La regularidad ayuda al sueño. Las necesidades dependen de la edad y la persona; no se fija una cantidad universal aquí.'],
 ['Antes de acostarse, ¿qué opción favorece una transición tranquila?', ['Añadir tareas urgentes', 'Tomar estimulantes', 'Reducir pantallas y preparar una rutina calmada', 'Hacer varias tareas simultáneas'], 2, 'Reduzca estimulación y reserve una transición tranquila. Si dormir es difícil de forma persistente, consulte.'],
 ['¿Qué espacio suele facilitar dormir?', ['Muy ruidoso', 'Con alertas constantes', 'Iluminado intensamente', 'Tranquilo y cómodo'], 3, 'Un entorno tranquilo, oscuro cuando sea posible y cómodo suele favorecer el descanso. Adapte lo que pueda.'],
 ['¿Qué hacer tras dormir poco antes de estudiar?', ['Ajustar la carga y planear recuperar una rutina', 'Compensar con medicación ajena', 'Ignorar el agotamiento', 'Eliminar todas las pausas'], 0, 'Adapte las tareas y proteja el descanso siguiente. No se recomiendan fármacos ni estimulantes en este juego.'],
 ['Si tiene problemas de sueño repetidos, ¿qué opción es adecuada?', ['Comprar cualquier sedante', 'Consultar a un profesional', 'Ocultarlo por vergüenza', 'Seguir consejos anónimos sin revisar'], 1, 'Busque orientación profesional para dificultades persistentes. Esta actividad ofrece educación general, no tratamiento.'],
 ],
 nutrition: [
 ['¿Qué caracteriza una alimentación variada?', ['Un único alimento', 'Distintos grupos de alimentos apropiados', 'Solo suplementos', 'Saltarse comidas como castigo'], 1, 'La variedad aporta distintos nutrientes. Las necesidades y restricciones personales requieren orientación individual.'],
 ['Para decidir sobre una bebida envasada, ¿qué información ayuda?', ['Solo el color', 'Solo la publicidad', 'Leer etiqueta e ingredientes', 'El número de seguidores'], 2, 'Revise ingredientes, tamaño de porción e información nutricional; la publicidad no reemplaza esos datos.'],
 ['¿Qué hábito favorece higiene al preparar alimentos?', ['Omitir el lavado de manos', 'Mezclar crudos y cocidos', 'Usar superficies sucias', 'Lavarse las manos y separar alimentos crudos'], 3, 'Lave manos y mantenga separación entre crudos y alimentos listos para comer para reducir contaminación.'],
 ['Un compañero tiene alergia alimentaria. ¿Qué hace?', ['Respetar su restricción y revisar ingredientes', 'Pedirle que pruebe un poco', 'Burlarse', 'Suponer que la alergia desapareció'], 0, 'Respete restricciones, revise etiquetas y evite presionar. Las alergias pueden requerir un plan profesional.'],
 ['¿Qué actitud evita estigmatizar a otros por su cuerpo?', ['Juzgar por apariencia', 'Hablar de hábitos sin humillar', 'Comparar pesos públicamente', 'Usar comida como castigo'], 1, 'El bienestar no se deduce de la apariencia. Promueva hábitos accesibles sin vergüenza ni comparaciones corporales.'],
 ],
 mindfulness: [
 ['Durante una pausa de atención, aparece una distracción. ¿Qué hace?', ['Castigarse', 'Notarla y volver suavemente al presente', 'Exigir mente vacía', 'Contener la respiración'], 1, 'Distraerse es normal. Note el pensamiento y vuelva a una sensación cómoda, como el apoyo de los pies.'],
 ['Una actividad de atención le incomoda. ¿Qué opción tiene?', ['Obligarse a continuar', 'Aguantar sin avisar', 'Detenerse y elegir otra pausa', 'Ignorar el malestar'], 2, 'La participación es voluntaria. Puede detenerse, abrir los ojos o elegir una actividad distinta.'],
 ['¿Qué afirmación sobre meditar es prudente?', ['Cura todas las enfermedades', 'Sustituye terapia', 'Impide sentir tristeza', 'Puede ser un recurso, no una cura universal'], 3, 'Una práctica de atención puede ayudar a algunas personas, pero no reemplaza atención profesional ni funciona igual para todos.'],
 ['¿Qué ancla sencilla permite observar el presente?', ['Notar los pies apoyados de forma cómoda', 'Competir por aguantar sin respirar', 'Eliminar todo pensamiento', 'Juzgar cada sensación'], 0, 'Observe un apoyo cómodo sin forzar respiración ni sensaciones. Si incomoda, cambie o detenga la actividad.'],
 ['¿Qué objetivo es realista para una pausa consciente?', ['No volver a preocuparse', 'Observar un momento sin juzgarse', 'Obtener un diagnóstico', 'Aprobar un examen automáticamente'], 1, 'La pausa busca observar el presente, no suprimir emociones ni garantizar resultados académicos.'],
 ],
};
export const wellbeingDecks: Deck[] = Object.entries(groups).map(([id, items]) => ({
 id: `arena-${id}`, title: 'Bienestar · decisiones guiadas', emoji: '🌿', level: 'Orientación general; no diagnóstico',
 questions: items.map(([q, options, answer, why]) => ({q, options, answer, why, source: 'GICM. (2026). Situaciones educativas originales. Referencias generales: OMS, salud mental https://www.who.int/health-topics/mental-health ; alimentación saludable https://www.who.int/news-room/fact-sheets/detail/healthy-diet ; CDC, sueño https://www.cdc.gov/sleep/about/ . No constituyen tratamiento personalizado.'})),
}));