import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  return shouldSuccess ? right(10) : left('error')
}

test('Success result', () => {
  const success = doSomething(true)

  expect(success.isRight()).toBeTruthy()
})

test('Error result', () => {
  const error = doSomething(false)

  expect(error.isLeft).toBeTruthy()
})
