import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
interface Props {
  items: string[];
  rootClass: string;
  header: string;
  onChange: (name: string, root: string, status: boolean) => void;
}

export const MobileSortItem: React.FC<Props> = ({ onChange, items, rootClass, header }) => {
  const onContainerClick = () => {
    const containers = Array.from(document.getElementsByClassName('filter-container'));
    containers.forEach((item) => {
      if (!item.classList.contains(rootClass)) item.classList.remove('active');
    });
    document.querySelector(`.filter-container.${rootClass}`)?.classList.toggle('active');
  };
  return (
    <div>
      <div className={`filter-container ${rootClass}`}>
        <div
          className="filter-header"
          onClick={() => {
            onContainerClick();
          }}
        >
          <h4>{header}</h4>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div
          className="filter-items"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {items.map((item) => {
            {
              return (
                <div key={item} className="filter-item">
                  {rootClass === 'sort-by' ? (
                    <>
                      <label
                        className={item === 'Most Popular' ? 'active' : ''}
                        onClick={() => {
                          onChange(item, rootClass, true);
                        }}
                      >
                        <span className="checkmark"></span>
                        {item}
                      </label>
                    </>
                  ) : (
                    <>
                      <Checkbox root={rootClass} name={item === 'onesize' ? 'One Size' : item} onChange={onChange} />
                    </>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
