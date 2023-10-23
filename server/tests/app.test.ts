import request from 'supertest'

import app from '../src/app'
import Todo from '../src/models/Todo'

describe('/api/todo', () => {
  test("should respond 201 for a valid POST request", async () => {
    jest.spyOn(Todo, 'create').mockResolvedValue({toJSON: jest.fn()})
    const res = await request(app).post("/api/todo").send({"todo": "things to do"})
    expect(res.statusCode).toBe(201)
  })

  test("should respond 400 for an invalid POST request", async () => {
    const res = await request(app).post("/api/todo").send('')
    expect(res.statusCode).toBe(400)
  })

  test("should respond 200 for a fulfilled GET request", async () => {
    jest.spyOn(Todo, 'findAll').mockResolvedValue([])
    const res = await request(app).get("/api/todo")
    expect(res.statusCode).toBe(200)
  })
  
  test("should respond 500 if server throw error", async () => {
    jest.spyOn(Todo, 'findAll').mockRejectedValue(new Error('Some error message'));
    const res = await request(app).get("/api/todo")
    expect(res.statusCode).toBe(500)
  })

  test("should resond 200 for a valid PATCH request", async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue([0])
    jest.spyOn(Todo, 'findByPk').mockImplementation(jest.fn().mockResolvedValue({
        toJSON: jest.fn((): object => {return {}})
    }));
    const res = await request(app).patch("/api/todo/1").send({"todo": "things to do"})
    expect(res.statusCode).toBe(200)
  })

  test("should respond with 404 for a PATCH request if task not found", async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue([0])
    jest.spyOn(Todo, 'findByPk').mockImplementation(jest.fn().mockResolvedValue({toJSON: jest.fn()}));
    const res = await request(app).patch("/api/todo/1").send({"todo": "things to do"})
    expect(res.statusCode).toBe(404)
    expect(res.body).toStrictEqual({'message': 'Task not found'})  
  })

  test("should respond 204 for a fulfilled DELETE request", async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(0)
    const res = await request(app).delete("/api/todo/1")
    expect(res.statusCode).toBe(204)
  })
})