const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.", (done) => {
    request(server)
      .get("/cafes")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(typeof response.body[0]).toBe("object");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", (done) => {
    const cafeIndex = 100;
    request(server)
      .delete(`/cafes/${cafeIndex}`)
      .set("Authorization", "Bearer tokenValido")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe(
          "No se encontró ningún cafe con ese id"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", (done) => {
    const cafe = {
      id: 100,
      nombre: "Café de Olla",
    };
    request(server)
      .post("/cafes")
      .send(cafe)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([expect.objectContaining(cafe)])
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", (done) => {
    const cafeIndex = 100;
    request(server)
      .put(`/cafes/${cafeIndex}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "El id del parámetro no coincide con el id del café recibido"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
