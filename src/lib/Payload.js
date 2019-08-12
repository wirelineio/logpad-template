

export const computeItems = log => {
  let items = log.filter(change => change.action === 'add').map(change => change.payload);

  // Apply changes.
  log.filter(change => change.action === 'modify').forEach(change => {
    const index = items.findIndex(item => item.id === change.payload.id);
    if (index !== -1) {
      items = [
        ...items.slice(0, index),
        {
          ...items[index],
          ...change.payload
        },
        ...items.slice(index + 1)
      ];
    }
  });
  
  return items;
}
