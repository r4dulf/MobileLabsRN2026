import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#d0d0d0',
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  preview: {
    fontSize: 13,
    color: '#444',
  },
});
