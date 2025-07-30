import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/apis/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PerchesCourse = ({ courseId }) => {
    const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
        useCreateCheckoutSessionMutation();

    const purchasedCourseHandler = async () => {
        await createCheckoutSession(courseId);
      
    };


    useEffect(() => {
        if (isSuccess) {
             console.log("Stripe data:", data?.url); 
            if (data?.url) {
                window.location.href = data.url; // Redirect to stripe checkout
            } else {
                toast.error("Invalid response from sever.");
            }
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to create checkout");
        }
    }, [data, isSuccess, isError,error]);

    return (
        <Button
            disabled={isLoading}
            onClick={purchasedCourseHandler}
            className="w-full"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
            ) : (
                "Purchese Course"
            )}
        </Button>
    );
};

export default PerchesCourse;
