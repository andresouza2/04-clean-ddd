import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-question-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 10, 6),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 10, 5),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 10, 9),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isRight())
      return expect(result.value?.questions).toEqual([
        expect.objectContaining({
          createdAt: new Date(2023, 10, 9),
        }),
        expect.objectContaining({
          createdAt: new Date(2023, 10, 6),
        }),
        expect.objectContaining({
          createdAt: new Date(2023, 10, 5),
        }),
      ])
  })

  it('Should be able to fetch pagineted recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isRight()) return expect(result.value?.questions).toHaveLength(2)
  })
})
