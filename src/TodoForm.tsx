import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

interface TodoFormProps {
  onAdd: (title: string) => void;
  onAddError: () => void;
}

type FormData = {
  title: string;
};

const schema = z.object({
  title: z.string().min(3),
});

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.title.trim() === '') {
      toast.error('Task title must be at least 3 characters long');
    } else {
      onAdd(data.title);
      reset();
    }
  };

  return (
    <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onSubmit)}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <input style={{width: 300, marginRight: 32}} {...register('title')} />
        <button type="submit">Add</button>
      </div>
      {errors.title && <span>{errors.title?.message}</span>}
    </form>
  );
};

export default TodoForm;
