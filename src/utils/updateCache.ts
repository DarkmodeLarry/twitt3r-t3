import { RouterInputs, RouterOutputs } from './api'
import { InfiniteData, QueryClient } from '@tanstack/react-query'

export function updateCache({
	client,
	variables,
	data,
	action,
	input,
}: {
	client: QueryClient
	input: RouterInputs['tweet']['timeline']
	variables: {
		tweetId: string
	}
	data: {
		userId: string
	}
	action: 'like' | 'unlike'
}) {
	client.setQueryData(
		[
			['tweet', 'timeline'],
			{
				input,
				type: 'infinite',
			},
		],
		(oldData) => {
			const newData = oldData as InfiniteData<
				RouterOutputs['tweet']['timeline']
			>
			const value = action === 'like' ? 1 : -1

			const newTweets = newData.pages.map((page) => {
				return {
					tweets: page.tweets.map((tweet) => {
						if (tweet.id === variables.tweetId) {
							return {
								...tweet,
								likes: action === 'like' ? [data.userId] : [],
								_count: {
									likes: tweet._count.likes + value,
								},
							}
						}
						return tweet
					}),
				}
			})

			return {
				...newData,
				pages: newTweets,
			}
		}
	)
}
