import { UnprocessableEntityException } from '@nestjs/common'

export function useThrowCatch(error: any) {
  if (error instanceof Object || error instanceof Error) throw error
  else throw new UnprocessableEntityException(error?.message || 'Something went wrong!')
}
