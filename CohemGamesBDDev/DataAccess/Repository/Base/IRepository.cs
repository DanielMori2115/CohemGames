using System.Linq.Expressions;

namespace CohemGamesBDDev.DataAccess.Repository.Base;

public interface IRepository<T>
{
    protected T Add(T entity);
    protected IEnumerable<T> AddRange(IEnumerable<T> entities);
    protected T Update(T entity);
    protected IEnumerable<T> UpdateRange(List<T> entities);
    protected IQueryable<T> Get(
        Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");
}