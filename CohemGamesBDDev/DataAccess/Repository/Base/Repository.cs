using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace CohemGamesBDDev.DataAccess.Repository.Base;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext Context;
    protected DbSet<T> DbSet;

    public Repository(ApplicationDbContext context)
    {
        Context = context;
        DbSet = context.Set<T>();
    }

    public T Add(T entity)
    {
        Context.Set<T>().Add(entity);

        Save();

        return entity;
    }

    public IEnumerable<T> AddRange(IEnumerable<T> entities)
    {
        Context.Set<T>().AddRange(entities);

        Save();

        return entities;
    }

    public T Update(T entity)
    {
        Context.Set<T>().Attach(entity);
        Context.Entry(entity).State = EntityState.Modified;

        Save();

        return entity;
    }

    public virtual void Delete(T entityToDelete)
    {
        if (Context.Entry(entityToDelete).State == EntityState.Detached)
        {
            DbSet.Attach(entityToDelete);
        }

        DbSet.Remove(entityToDelete);

        Save();
    }

    public virtual void DeleteRange(List<T> entities)
    {
        entities.ForEach(entityToDelete =>
        {
            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }

            DbSet.Remove(entityToDelete);
        });

        Save();
    }

    public IEnumerable<T> UpdateRange(List<T> entities)
    {
        entities.ForEach(entity =>
        {
            Context.Set<T>().Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
        });

        Save();

        return entities;
    }

    public IQueryable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
    {
        IQueryable<T> query = DbSet;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        includeProperties ??= "";
        
        foreach (var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty);
        }

        return orderBy != null ? orderBy(query) : query;
    }

    private void Save()
    {
        Context.SaveChanges();
    }
}