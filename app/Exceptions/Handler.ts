import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any) {
    if (error.message === 'E_ROW_NOT_FOUND: Row not found') {
      return {
        message: 'Recurso não encontrado',
      }
    }
  }
}
