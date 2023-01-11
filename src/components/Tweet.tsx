import Image from 'next/image'
import { api } from '../utils/api'
import { updateCache } from '../utils/updateCache'
import { AiFillHeart } from 'react-icons/ai'
import { RouterInputs, RouterOutputs } from '../utils/api'
import {
	QueryClient,
	InfiniteData,
	useQueryClient,
} from '@tanstack/react-query'
import useScrollPosition from '../utils/useScroll'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocal from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(updateLocal)
dayjs.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s',
		s: '1m',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
		M: '1M',
		MM: '%dM',
		y: '1y',
		yy: '%dy',
	},
})

function Tweet({
	tweet,
	client,
	input,
}: {
	tweet: RouterOutputs['tweet']['timeline']['tweets'][number]
	client: QueryClient
	input: RouterInputs['tweet']['timeline']
}) {
	const likeMutation = api.tweet.like.useMutation({
		onSuccess: (data, variables) => {
			updateCache({ client, data, variables, input, action: 'like' })
		},
	}).mutateAsync

	const unlikeMutation = api.tweet.unlike.useMutation({
		onSuccess: (data, variables) => {
			updateCache({ client, data, variables, input, action: 'unlike' })
		},
	}).mutateAsync

	const hasLiked = tweet.likes.length > 0

	return (
		<div className='mb-4 border-b-2 border-gray-500'>
			<div className='flex p-2'>
				{tweet.author.image && (
					<Image
						src={tweet.author.image}
						alt={`${tweet.authorId}`}
						width={48}
						height={48}
						className='rounded-full'
					/>
				)}

				<div className='ml-2'>
					<div className='flex items-center'>
						<p className='font-bold'>
							<Link href={`/${tweet.author.name}`}>{tweet.author.name}</Link>
						</p>
						<p className='pl-1 text-xs text-gray-500'>
							- {dayjs(tweet.createdAt).fromNow()}
						</p>
					</div>

					<div>{tweet.text}</div>
				</div>
			</div>

			<div className='mt-4 flex items-center p-2 cursor-pointer'>
				<AiFillHeart
					color={hasLiked ? 'red' : 'gray'}
					size='1.5rem'
					onClick={() => {
						if (hasLiked) {
							unlikeMutation({
								tweetId: tweet.id,
							})
							return
						}

						likeMutation({
							tweetId: tweet.id,
						})
					}}
				/>

				<span className='text-xs text-gray-500'>{tweet._count.likes}</span>
			</div>
		</div>
	)
}

export default Tweet
