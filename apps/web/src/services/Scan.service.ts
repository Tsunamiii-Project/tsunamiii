
import type { AxiosResponse } from 'axios'

import { withCredentials } from '@tsunamiii/constants'
import type { TScan } from '@tsunamiii/types'
import { TScanCreateData } from '@web/utils/types'
import { api } from '@web/utils/api'

export class ScanService {
  static async create(data: TScanCreateData): Promise<AxiosResponse<TScan>> {
    return await api.post('/scans', data, withCredentials)
  }

  static async getScan(id: string): Promise<AxiosResponse<TScan>> {
    return await api.get(`/scans/${id}`, withCredentials)
  }
}
