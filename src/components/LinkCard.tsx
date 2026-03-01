import { LinkItem } from '../types/types';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';


interface LinkCardProps {
  link: LinkItem;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LinkCard({
  link,
  onOpen,
  onEdit,
  onDelete,
}: LinkCardProps) {
  return (
    <div className="link-card">
      <div className="link-content" onClick={onOpen}>
        <h3>{link.title}</h3>
        <p className="url">{link.url}</p>

        {link.description && (
          <p className="description">{link.description}</p>
        )}

        {link.tags.length > 0 && (
          <div className="tags">
            {link.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

      <div className="link-actions">
        <Button onClick={onEdit}>Edit</Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}