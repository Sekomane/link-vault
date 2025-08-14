import { useState, useEffect } from 'react';
import { LinkItem, LinkFormMode, LinkFormSubmitHandler } from '../types/types';

interface LinkFormProps {
  onSubmit: LinkFormSubmitHandler;
  mode: LinkFormMode;
  initialData?: LinkItem | null;
  onCancel: () => void;
}

export default function LinkForm({ onSubmit, mode, initialData, onCancel }: LinkFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: ''
  });
  const [currentTag, setCurrentTag] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>(['work', 'personal', 'research', 'tutorial']);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title,
        url: initialData.url,
        description: initialData.description,
        tags: initialData.tags.join(', ')
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.split(',').map(t => t.trim()).includes(currentTag.trim())) {
      const newTags = formData.tags ? `${formData.tags}, ${currentTag.trim()}` : currentTag.trim();
      setFormData(prev => ({ ...prev, tags: newTags }));
      setCurrentTag('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== tagToRemove)
      .join(', ');
    setFormData(prev => ({ ...prev, tags: updatedTags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
    if (mode === 'create') {
      setFormData({
        title: '',
        url: '',
        description: '',
        tags: ''
      });
    }
  };

  const currentTags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <h2>{mode === 'create' ? 'Add New Link' : 'Edit Link'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Tags</label>
        <div className="tags-input-container">
          <div className="tags-display">
            {currentTags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button 
                  type="button" 
                  onClick={() => handleRemoveTag(tag)}
                  className="tag-remove"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="tag-input-wrapper">
            <input
              type="text"
              value={currentTag}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags..."
              className="tag-input"
            />
          
          </div>

        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit">
          {mode === 'create' ? 'Add Link' : 'Update Link'}
        </button>
        {mode === 'edit' && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}