import { useState } from 'react';
import { useNewsletter } from '@/contexts/NewsletterContext';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoteButtonProps {
  itemId: string;
  itemType: 'tema' | 'artigo' | 'grafico' | 'tabela';
}

export default function VoteButton({ itemId, itemType }: VoteButtonProps) {
  const [voted, setVoted] = useState(false);
  const { addVote, getVotes } = useNewsletter();
  const voteCount = getVotes(itemId);

  const handleVote = () => {
    if (!voted) {
      addVote(itemId, itemType);
      setVoted(true);
      setTimeout(() => setVoted(false), 1000);
    }
  };

  return (
    <Button
      onClick={handleVote}
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 transition-all ${
        voted
          ? 'bg-amber-600/30 border-amber-600 text-amber-400'
          : 'hover:bg-amber-900/20 hover:border-amber-700'
      }`}
    >
      <ThumbsUp className="w-4 h-4" />
      <span>{voteCount > 0 ? voteCount : 'Votar'}</span>
    </Button>
  );
}
