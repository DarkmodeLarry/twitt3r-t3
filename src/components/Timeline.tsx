import { useEffect, useState } from 'react'
import { RouterInputs, api } from '../utils/api'
import { CreateTweet } from './CreateTweet'
import Tweet from './Tweet'
import useScrollPosition from '../utils/useScroll'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

const LIMIT = 10

export function Timeline({
	where = {},
}: {
	where: RouterInputs['tweet']['timeline']['where']
}) {
	const scrollPosition = useScrollPosition()

	const { data, hasNextPage, fetchNextPage, isFetching } =
		api.tweet.timeline.useInfiniteQuery(
			{
				limit: LIMIT,
				where,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			}
		)

	const client = useQueryClient()

	const tweets = data?.pages.flatMap((page) => page.tweets) ?? []

	useEffect(() => {
		if (scrollPosition > 90 && hasNextPage && !isFetching) {
			fetchNextPage()
		}
	}, [scrollPosition, hasNextPage, isFetching, fetchNextPage])

	return (
		<div>
			<CreateTweet />
			<div className='border-r-2 border-l-2 border-t-2 border-gray-500 '>
				{tweets.map((tweet) => {
					return (
						<Tweet
							key={tweet.id}
							tweet={tweet}
							client={client}
							input={{
								where,
								limit: LIMIT,
							}}
						/>
					)
				})}

				{!hasNextPage && <p>No more items to load</p>}
			</div>
		</div>
	)
}
