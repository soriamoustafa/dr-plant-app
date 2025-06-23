interface CategoryPillProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const CategoryPill = ({ title, active, onClick }: CategoryPillProps) => {
  return (
    <button 
      className={`transition-all duration-300 py-2 px-4 rounded-full text-sm text-gray-500 font-medium border ${
        active 
          ? 'bg-primary-light text-primary-dark border-primary-light hover:bg-primary hover:text-white' 
          : 'bg-white text-neutral-light border-neutral hover:border-primary-light '
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CategoryPill;
