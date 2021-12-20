import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../../utils/constants'

type ServerError = {
  error: string
}

export const get = async <T>(url: string): Promise<T | ServerError> => {
  try {
    const res = await axios.get<T>(`${BASE_URL}${url}`)
    return res.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>
      if (serverError && serverError.response) {
        return serverError.response.data
      }
    }
    return { error: 'something went wrong!' }
  }
}
