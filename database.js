const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const app = express();

const corsOptions = {
    origin: '*',  // Permite solicitudes de cualquier dominio
    methods: ['GET', 'POST'],  
};

app.use(cors(corsOptions));  
app.use(bodyParser.json());

const { createPool } = require('mysql2');

const pool = createPool({
    host: "localhost",  //Esta es la URL del dominio dinamico de duck creada 
    user: "nuevo_admin",
    password: "Azulazul1%yono",
    database: "sys",
    connectionLimit: 15

});

// Ruta para manejar el registro de usuarios
app.post('/api/usuarioo', (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    pool.query(
        `INSERT INTO usuarioo (nombre, correo, contrasena) VALUES (?, ?, ?)`,
        [nombre, correo, contrasena],
        (err, result) => {
            if (err) {
                console.error('Error insertando usuario:', err);
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }

            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    );
});

// Ruta para manejar el restablecimiento de contraseña
app.post('/api/reset-password', (req, res) => {
    const { correo, nuevaContrasena } = req.body;

    pool.query(
        `SELECT * FROM usuarioo WHERE correo = ?`,
        [correo],
        (err, results) => {
            if (err) {
                console.error('Error al verificar el correo:', err);
                return res.status(500).json({ error: 'Error al verificar el correo' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'El correo electrónico no está registrado' });
            }

            pool.query(
                `UPDATE usuarioo SET contrasena = ? WHERE correo = ?`,
                [nuevaContrasena, correo],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar la contraseña:', err);
                        return res.status(500).json({ error: 'Error al actualizar la contraseña' });
                    }

                    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
                }
            );
        }
    );
});

// Ruta para validar usuario
app.post('/api/validate-user', (req, res) => {
    const { correo, contrasena } = req.body;

    pool.query(
        `SELECT * FROM usuarioo WHERE correo = ? AND contrasena = ?`,
        [correo, contrasena],
        (err, results) => {
            if (err) {
                console.error('Error al validar el usuario:', err);
                return res.status(500).json({ error: 'Error al validar el usuario' });
            }

            if (results.length == 0) {
                return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
            }

            res.status(200).json({ message: 'Usuario validado exitosamente' });
        }
    );
});

// Crear materias para profesores
app.get('/api/ProfesorCurso/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    console.log('ID Usuario recibido:', id_usuario);

    pool.query(
        `SELECT c.id_curso, c.nombreCurso, c.sigla, c.DescripcionCurso, c.imagenCurso
        FROM curso c
        JOIN ProfesorCurso pc ON c.id_curso = pc.id_curso
        WHERE pc.id_usuario = ?`, [id_usuario], (err, results) => {
        if (err) {
            console.error('Error al obtener los cursos del profesor:', err);
            return res.status(500).json({ error: 'Error al obtener los cursos del profesor', detalles: err });
        }

        if (results.length === 0) {
            console.log('No se encontraron cursos para el profesor con ID:', id_usuario);
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor' });
        }

        res.status(200).json({ cursos: results });
    });
});



//Generar asistencia alumno
app.post('/api/asistenciaAlumno', (req, res) => { 
    const { id_alumno_curso, id_curso, asistencia } = req.body; 
    if (!id_alumno_curso || !id_curso || typeof asistencia === 'undefined')
         { return res.status(400).json({ error: 'Por favor, provee todos los datos necesarios' }); 
    } pool.query( `INSERT INTO asistenciaAlumno (id_profesor_curso, id_curso, asistencia) VALUES (?, ?, ?)`, 
        [id_alumno_curso, id_curso, asistencia], 
        (err, result) => { 
            if (err) { console.error('Error insertando asistencia:', err); 
                return res.status(500).json({ error: 'Error al registrar la asistencia' }); 
            }
                 res.status(200).json({ message: 'Asistencia registrada con éxito' }); 
            } ); 
});

/* 

CREATE TABLE sys.Asistencia ( 
id INT PRIMARY KEY AUTO_INCREMENT, 
id_profesor_curso INT, 
id_curso INT, 
asistencia BOOLEAN,
FOREIGN KEY (id_profesor_curso) REFERENCES sys.ProfesorCurso (id_profesor_curso),
FOREIGN KEY (id_curso) REFERENCES sys.curso(id_curso)

); 

*/
const PORT = 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);

});

