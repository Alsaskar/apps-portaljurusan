import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const useFormatDate = () => {
  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'd MMMM yyyy', { locale: id });
  };

  return { formatDate };
};

export default useFormatDate;
