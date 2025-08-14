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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      ...(mode === 'edit' && initialData ? { 
        id: initialData.id,
        createdAt: initialData.createdAt 
      } : {})
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
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
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