import { db } from '@/config/firebaseConfig';
import { ITask } from '@/types/interfaces';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

const create = async (userId: string, task: Omit<ITask, 'id'>): Promise<ITask> => {
  const tasksRef = collection(db, 'users', userId, 'tasks');

  const docRef = await addDoc(tasksRef, {
    ...task,
    scheduledAt: Timestamp.fromDate(task.scheduledAt),
    createdAt: Timestamp.fromDate(task.createdAt),
    updatedAt: Timestamp.fromDate(task.updatedAt),
  });

  return {
    id: docRef.id,
    ...task,
  };
};

const update = async (userId: string, taskId: string, task: Omit<ITask, 'id'>): Promise<ITask> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);

  await setDoc(taskRef, {
    ...task,
    scheduledAt: Timestamp.fromDate(task.scheduledAt),
    createdAt: Timestamp.fromDate(task.createdAt),
    updatedAt: Timestamp.fromDate(new Date()),
  });

  return { id: taskId, ...task };
};

const remove = async (userId: string, taskId: string): Promise<void> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskRef);
};

const getTaskForPeriod = async (userId: string, start: Date, end: Date): Promise<ITask[]> => {
  const taskRef = collection(db, 'users', userId, 'tasks');

  const q = query(
    taskRef,
    where('scheduledAt', '>=', Timestamp.fromDate(start)),
    where('scheduledAt', '<=', Timestamp.fromDate(end)),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    description: doc.data().description ?? null,
    scheduledAt: doc.data().scheduledAt.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as ITask[];
};

const getById = async (userId: string, taskId: string): Promise<ITask> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  const snapshot = await getDoc(taskRef);

  if (!snapshot.exists()) throw new Error('Task not found');

  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,
    description: data.description ?? null,
    scheduledAt: data.scheduledAt.toDate(),
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as ITask;
};

const updateStatus = async (userId: string, taskId: string, completed: boolean): Promise<ITask> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);

  await updateDoc(taskRef, {
    completed,
    updatedAt: Timestamp.fromDate(new Date()),
  });

  const snapshot = await getDoc(taskRef);
  return { id: snapshot.id, ...snapshot.data() } as ITask;
};

export const taskService = {
  create,
  update,
  remove,
  getTaskForPeriod,
  updateStatus,
  getById,
};
