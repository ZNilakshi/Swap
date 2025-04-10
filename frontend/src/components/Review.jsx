import { useState } from 'react';
import { FiStar, FiUser, FiSend, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const avatarImages = [
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Tanned'
];

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      name: "Alex Johnson", 
      rating: 5, 
      comment: "The transfer process was seamless and professional.", 
      date: "2 days ago", 
      avatar: avatarImages[0] 
    },
    { 
      id: 2, 
      name: "Sam Lee", 
      rating: 4, 
      comment: "Great communication throughout the entire process.", 
      date: "1 week ago", 
      avatar: avatarImages[1] 
    },
    { 
      id: 3, 
      name: "Taylor Smith", 
      rating: 5, 
      comment: "Extremely helpful and responsive to all my questions.", 
      date: "3 days ago", 
      avatar: avatarImages[2] 
    },
    { 
      id: 4, 
      name: "Jordan Williams", 
      rating: 4, 
      comment: "Made the transfer process much easier than expected.", 
      date: "2 weeks ago", 
      avatar: avatarImages[0] 
    }
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment && name) {
      const newReview = {
        id: Date.now(),
        name,
        rating,
        comment,
        date: "Just now",
        avatar: avatarImages[Math.floor(Math.random() * avatarImages.length)]
      };
      setReviews([newReview, ...reviews]);
      setRating(0);
      setName('');
      setComment('');
      setShowForm(false);
    }
  };

  // Group reviews into pairs for 2-column layout
  const reviewPairs = [];
  for (let i = 0; i < reviews.length; i += 2) {
    reviewPairs.push(reviews.slice(i, i + 2));
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Reviews</h2>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-600">{reviews.length} reviews</span>
        </div>
      </div>

      {/* Review Form Trigger */}
      {!showForm && (
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="w-full mb-8 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <span className="text-gray-500">Share your experience</span>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={avatarImages[2]} 
              alt="User" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://www.gravatar.com/avatar/default?s=128&d=identicon';
              }}
            />
          </div>
        </motion.button>
      )}

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">Write a Review</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                        star <= (hoverRating || rating) ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      <FiStar className={`w-5 h-5 ${star <= (hoverRating || rating) ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts about this teacher..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={!rating || !comment || !name}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  rating && comment && name 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiSend className="w-4 h-4" />
                Submit Review
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List - 2 columns on desktop */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        {reviews.map((review) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://www.gravatar.com/avatar/default?s=128&d=identicon';
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;