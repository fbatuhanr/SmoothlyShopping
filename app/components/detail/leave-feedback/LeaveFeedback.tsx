import axios from 'axios';
import React, { useState } from 'react'
import Button from '../../general/clickable/Button';
import { Modal, Textarea } from 'flowbite-react';
import { Rating } from '@mui/material';
import LoadingSpinner from '../../general/LoadingSpinner';
import { Review } from '@prisma/client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface LeaveFeedbackProps {
    userId: string
    productId: string
    brandName: string
    productName: string

    currentUserFeedback: Review | undefined
}
const LeaveFeedback: React.FC<LeaveFeedbackProps> = ({ userId, productId, brandName, productName, currentUserFeedback }) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [rating, setRating] = useState<number>(currentUserFeedback ? currentUserFeedback.rating : 0)
    const [comment, setComment] = useState<string>(currentUserFeedback ? currentUserFeedback.comment : "")
    function onCloseModal() {
        setOpenModal(false);
    }
    const handleFeedbackSubmit = () => {
        if (!rating || !comment)
            return

        setIsLoading(true)

        console.log(rating)
        console.log(comment)

        const resultData = {
            userId,
            productId,
            rating,
            comment
        }

        axios.post("/api/review", resultData)
            .then((response) => {
                console.log(response)

                setIsLoading(false)
                setOpenModal(false)
                toast.success('Successfully completed!')
                router.refresh()
            }).catch((error) => {
                console.log("request error!" + error)
            })
    }

    const handleFeedbackUpdate = () => {

        if (!rating || !comment)
            return

        setIsLoading(true)

        console.log(rating)
        console.log(comment)

        const resultData = {
            rating,
            comment
        }

        axios.put(`/api/review/${currentUserFeedback?.id}`, resultData)
            .then((res) => {

                console.log(res)

                setIsLoading(false)
                setOpenModal(false)
                toast.success('Successfully updated!')
                router.refresh()
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    const handleFeedbackRemove = () => {

        setIsLoading(true)

        axios.delete(`/api/review/${currentUserFeedback?.id}`)
            .then((res) => {

                setIsLoading(false)
                setOpenModal(false)
                toast.success('Successfully removed!')
                window.location.reload()
            })
            .catch((error: any) => {
                console.log(error)
            })

    }

    return (
        <div className="w-48">
            <Button text={!currentUserFeedback ? "Leave a feedback" : "Edit your feedback"} onClick={() => setOpenModal(true)} />
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header>
                    <div className="p-3">{currentUserFeedback ? "Edit" : "Leave"} Feedback</div>
                </Modal.Header>
                <Modal.Body>
                    {
                        !isLoading ?
                            <div>
                                <div className="mb-2">{brandName} - {productName}</div>
                                <div className="my-2 text-center">
                                    <Rating name="rate-control" size="large"
                                        value={rating}
                                        onChange={(event, newValue) => setRating(newValue!)}
                                    />
                                </div>
                                <div>
                                    <Textarea rows={3} onChange={(e) => setComment(e.target.value)} value={comment} />
                                </div>
                                <div className="flex gap-x-2">
                                    {currentUserFeedback && <Button onClick={handleFeedbackRemove} text="Remove Feedback" color="quaternary" innerHeight={3} className="mt-2" />}
                                    <Button onClick={currentUserFeedback ? handleFeedbackUpdate : handleFeedbackSubmit} text={currentUserFeedback ? "Update" : "Submit"} color="secondary" innerHeight={3} className="mt-2" />
                                </div>
                            </div>
                            :
                            <LoadingSpinner />
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LeaveFeedback