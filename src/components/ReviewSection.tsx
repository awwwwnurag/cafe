
import React from 'react';
import { Review } from '@/types';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg">
      <h2 className="font-bold text-xl mb-4">Reviews ({reviews.length})</h2>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.userImage} alt={review.user} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-medium">{review.user}</h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-green-700 px-2 py-1 rounded text-white text-sm">
                <Star className="h-3 w-3 mr-1 fill-white" />
                <span>{review.rating}</span>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-gray-700">{review.comment}</p>
            
            {review.images && review.images.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {review.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Review image ₹{index + 1}`} 
                    className="h-24 w-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            
            <div className="mt-3 flex gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center"
              >
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                {review.likes}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center"
              >
                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                {review.dislikes}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
