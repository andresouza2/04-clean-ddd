import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}
type FetchQuestionAnswersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    if (!answers) return left(new ResourceNotFoundError())

    return right({
      answers,
    })
  }
}
