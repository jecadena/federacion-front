const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Cambia esto por tu usuario de MySQL si es diferente
  password: '',        // Cambia esto si tu base de datos tiene una contraseña
  database: 'federacion',  // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL.');
  }
});

// Método para insertar federación
app.post('/api/federacion', async (req, res) => {
  const { n_federacion, n_country, c_person, p_number, email_address, mobile_number, clave } = req.body;

  // Verificar si la clave está vacía
  if (!clave) {
    return res.status(400).send('La clave es obligatoria');
  }

  try {
    // Encriptar la clave antes de guardarla
    const hashedClave = await bcrypt.hash(clave, 10);

    // Verificar que la clave se haya encriptado correctamente
    console.log('Clave encriptada:', hashedClave); // Esto es solo para depurar, puedes eliminarlo más tarde

    // Consulta SQL para insertar los datos en la base de datos
    const query = `
      INSERT INTO federacion (n_federacion, n_country, c_person, p_number, email_address, mobile_number, clave)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Realizar la inserción en la base de datos
    db.query(
      query,
      [n_federacion, n_country, c_person, p_number, email_address, mobile_number, hashedClave],
      (err, result) => {
        if (err) {
          console.error('Error al insertar datos:', err);
          return res.status(500).send('Error al guardar la federación');
        } else {
          res.status(201).send({ message: 'Federación guardada con éxito', id: result.insertId });
        }
      }
    );
  } catch (err) {
    console.error('Error al encriptar la clave:', err);
    return res.status(500).send('Error al encriptar la clave');
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
