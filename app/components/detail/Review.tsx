
import { Rating as MuiRating } from "@mui/material";
import { Rating } from 'flowbite-react';
import Comment from "./Comment";

const Review = ({ reviews }: any) => {

    if (!reviews) return;

    const reviewCount = reviews.length;
    const reviewRating = reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / reviewCount;

    const reviewStarCounts = {
        five: reviews.filter((review: any) => review.rating == 5).length,
        four: reviews.filter((review: any) => review.rating == 4).length,
        three: reviews.filter((review: any) => review.rating == 3).length,
        two: reviews.filter((review: any) => review.rating == 2).length,
        one: reviews.filter((review: any) => review.rating == 1).length
    }
    const reviewStarPercentage = {
        five: 100 / reviewCount * reviewStarCounts.five,
        four: 100 / reviewCount * reviewStarCounts.four,
        three: 100 / reviewCount * reviewStarCounts.three,
        two: 100 / reviewCount * reviewStarCounts.two,
        one: 100 / reviewCount * reviewStarCounts.one
    }

    return (
        <div className="flex flex-col gap-y-6 items-center" >
            <div className="text-2xl font-medium mt-2">What do our customers say?</div>
            <div className="flex flex-col items-center gap-y-10 max-w-2xl">
                <div className="min-w-full">
                    <div className="flex items-end justify-center">
                        <MuiRating name="product-rating" value={reviewRating} precision={0.5} readOnly />
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                            {reviewRating} out of 5
                        </p>
                    </div>
                    <div className="mt-2 mb-4">
                        <p className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400">{reviewCount} global ratings</p>
                    </div>
                    <div className="detail-rating-percentages">
                        <Rating.Advanced percentFilled={reviewStarPercentage.five} className="dr-percentage mb-2 justify-center">5 star</Rating.Advanced>
                        <Rating.Advanced percentFilled={reviewStarPercentage.four} className="dr-percentage mb-2 justify-center">4 star</Rating.Advanced>
                        <Rating.Advanced percentFilled={reviewStarPercentage.three} className="dr-percentage mb-2 justify-center">3 star</Rating.Advanced>
                        <Rating.Advanced percentFilled={reviewStarPercentage.two} className="dr-percentage mb-2 justify-center">2 star</Rating.Advanced>
                        <Rating.Advanced percentFilled={reviewStarPercentage.one} className="dr-percentage justify-center">1 star</Rating.Advanced>
                    </div>
                </div>
                <div className="min-w-96">
                    {
                        reviews.map((review: any) =>
                            <Comment key={review.id} review={review} />
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Review